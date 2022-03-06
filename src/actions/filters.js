// These action objects will be dispatched in the relevant connected components using mapDispatchToProps.
// setTextFilter and setStart/EndDate will require an argument to be provided. Send this argument to the reducer.

// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});


//For the dropdown all we need to record is the type. This type will be recorded in state.filter.sortBy.

// SORT_BY_DATE
export const sortByDate = () => ({
  type: 'SORT_BY_DATE'
});

// SORT_BY_AMOUNT
export const sortByYear = () => ({
  type: 'SORT_BY_YEAR'
});

// SORT_BY_PERIOD
export const sortByPeriod = () => ({
  type: 'SORT_BY_PERIOD'
})

// SET_START_DATE
export const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});

// SET_END_DATE
export const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});
