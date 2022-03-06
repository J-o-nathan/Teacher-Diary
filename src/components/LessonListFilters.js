import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, sortByDate, sortByYear, sortByPeriod, setStartDate, setEndDate } from '../actions/filters';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronRight, faCircleChevronLeft, faCircleXmark } from '@fortawesome/free-solid-svg-icons'


export class LessonListFilters extends React.Component {
// Dispatch any changes to the filters state. Firebase doesn't need to track filters state.
// selectLessons will use the changing filters state to render the appropriate lessons only
// Don't need to 'this' bind as using 'transform class properties' plugin.

  state = {
    calendarFocused: null,
    day: moment(),
  };

// Set up methods that use the mapDispatchToProps functions inside them.

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onDateIncrement = () => {
    let tomorrow = this.state.day.add(1, 'days')
// dispatch to change the startdate and end date to 'tomorrow'
    this.props.setStartDate(tomorrow)
    this.props.setEndDate(tomorrow)
// the state in the store keeps track of the days picked from the datepicker. This isn't perfect for the Increments.
// in local state keep today's day and use this to increment. 
    this.setState(() => ({ day: tomorrow }))
  }

  onDateDecrement = () => {
    let yesterday = this.state.day.subtract(1, 'days')
    this.props.setStartDate(yesterday)
    this.props.setEndDate(yesterday)
    this.setState(() => ({ day: yesterday }))    
  }

  onDateReset = () => {
    let day = moment()
    this.setState(() => ({ day }))
    this.props.setStartDate(moment())
    this.props.setEndDate(moment())
  }

  onFocusChange = (calendarFocused) => {
//This state is managed locally, no need to dispatch to the store.
    this.setState(() => ({ calendarFocused }));
  }
  onTextChange = (e) => {
// Access e.target.value to get the text input. Pass this into setTextFilter().
    this.props.setTextFilter(e.target.value);
  };
  onSortChange = (e) => {
// This is the event handler for the dropdown selector. Use 'e' to determine the value selected.
// Dispatch the changes to the state in the store. 
// This changing state will be used in the selectLessons() function
    if (e.target.value === 'date') {
      this.props.sortByDate();
    } else if (e.target.value === 'year') {
      this.props.sortByYear();
    }
    else if (e.target.value === 'period') { 
      this.props.sortByPeriod() 
    }
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
        <p className='mobile-date show-for-mobile'>{this.props.filteredDate.format("dddd, MMMM Do YYYY")}</p>
          <div className="input-group__item show-on-desktop">
            <input
              type="text"
              className="text-input"
              placeholder="Search lessons"
// The value is set to state.filters.text
// onChange will fire changes in the state, which are then reflected automatically in "value".
              value={this.props.filters.text}
              onChange={this.onTextChange}
            />
          </div>
          <div className="input-group__item show-on-desktop">
{/* This is the dropdown selector. It will change the sortBy filter based on the "value" of the selected item. */}
{/* Set the value of the dropdown to state.filters.sortBy.  */}
{/* The onChange handler will change the state */}
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.onSortChange}
            >
              <option value="date">Created</option>
              {/* <option value="date-n-2-o">Date (new to old)</option> */}
              <option value="year">Class</option>
              <option value="period">Period</option>
            </select>
          </div>
          <div className="input-group__item" id="date-range-picker">
            <DateRangePicker
// The DateRangePicker requires props, get these values from the state
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              showClearDates={false}
              numberOfMonths={1}
              isOutsideRange={() => false}
            />
          </div>
          {/* <div className="increment-container"> */}
          <div className='increment-container'>
            <FontAwesomeIcon className='increment-button' onClick={this.onDateDecrement} icon={faCircleChevronLeft} />
            <FontAwesomeIcon className='increment-button' onClick={this.onDateReset} icon={faCircleXmark} />
            <FontAwesomeIcon className='increment-button' onClick={this.onDateIncrement} icon={faCircleChevronRight} />
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters,
  filteredDate: state.filters.startDate
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  sortByDate: () => dispatch(sortByDate()),
  sortByYear: () => dispatch(sortByYear()),
  sortByPeriod: () => dispatch(sortByPeriod()),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonListFilters);
