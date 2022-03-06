import moment from 'moment';

// Use this function to determine the visible lessons to show on the summary page. 
// This is not to change the state, only to determine 'visible lessons' rendered on the screen.

// A function that takes in the list of lessons and also the filters. 
// Returns a new array that contains items that pass all filter test
// Sort this new filtered array by the relevant criteria

export default (lessons, { text, sortBy, startDate, endDate }) => {
  return lessons.filter((lesson) => {

    const yearGroup = 'year ' + lesson.year

    const createdAtMoment = moment(lesson.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch = lesson.note.toLowerCase().includes(text.toLowerCase()) || yearGroup.toString().includes(text.toLowerCase())

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt > b.createdAt ? 1 : -1;
    } else if (sortBy === 'year') {
      return a.year > b.year ? 1 : -1;
    } else if (sortBy === 'period') {
      return a.period > b.period ? 1 : -1
    }
  });
};
