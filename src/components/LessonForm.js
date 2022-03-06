import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class LessonForm extends React.Component {

// This form tracks local state and then when submitted it passes the data into whatever onSubmit handler is provided in props.
// Different parents can provide different onSubmit handlers in the props. This form is reusable.

// We need to call the constructor and super to access the props (to check for props.lesson).

  constructor(props) {
    super(props);

    this.state = {
      period: props.lesson ? props.lesson.period : '',
      note: props.lesson ? props.lesson.note : '',
      year: props.lesson ? (props.lesson.year).toString() : '',
      createdAt: props.lesson ? moment(props.lesson.createdAt) : moment(),
      calendarFocused: false,
      error: '',
    };
  }
  onPeriodChange = (e) => {
    const period = e.target.value;

    if (!period || period.match(/^[0-9]/) && (period.length < 4)) {
      this.setState(() => ({ period }));
    }
  };
  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onYearChange = (e) => {
    const year = e.target.value;

    if (!year || year.match(/^\d{1,2}?$/)) {
      this.setState(() => ({ year }));
    }
  };
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.period || !this.state.year) {
      this.setState(() => ({ error: 'Please provide period and year group.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        period: this.state.period,
        year: parseFloat(this.state.year, 10),
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
      console.log('form submitted!')
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input 
          type="text"
          placeholder="Period"
          autoFocus
          className={`text-input ${this.state.period.length === 0 && this.state.error ? 'field-error' : ''}`}
          value={this.state.period}
          onChange={this.onPeriodChange}
        />
        <input 
          type="text"
          placeholder="Year Group"
          className={`text-input ${this.state.year.length === 0 && this.state.error ? 'field-error' : ''}`}
          value={this.state.year}
          onChange={this.onYearChange}
        />
        <SingleDatePicker
// Pass in the required props as defined in the docs for the 3rd party library.
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="Add a note for your lesson (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        >
        </textarea>
        <div>
          <button className="button">{this.props.buttonName}</button>
        </div>
      </form>
    )
  }
}
