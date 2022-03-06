import moment from 'moment';

// Set up the default state, and all the cases you want to change it.
// Set up the action generators to dispatch action objects to change the state in the store
// Access these action generators to change the filters in relevant connected components using mapDispatchToProps

// The changing filters will be accessed in a function selectLessons.
// selectLessons will return items that pass the filter test. This is only for rendering on the screen, not changing the state or database etc.


const filtersReducerDefaultState = {
  text: '',
  sortBy: 'period',
  startDate: moment().startOf('day'),
  endDate: moment().endOf('day')
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
//Return the whole state and then write over text with the updates
//For this case the updates will live on the text property of the action object that is dispatched to the store.
      return {
        ...state,
        text: action.text
      };
    case 'SORT_BY_YEAR':
      return {
        ...state,
        sortBy: 'year'
      };
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date'
      };
    case 'SORT_BY_PERIOD':
      return {
        ...state,
        sortBy: 'period'
      };
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      };
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};
