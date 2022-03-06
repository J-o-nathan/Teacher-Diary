import moment from 'moment';
import selectLessons from '../../selectors/lessons';
import lessons from '../fixtures/lessons';

test('should filter by text value', () => {
  const filters = {
    text: 'e',
    sortBy: 'period',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectLessons(lessons, filters);
  expect(result).toEqual([lessons[2], lessons[1]]);
});

test('should filter by startDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: undefined
  };
  const result = selectLessons(lessons, filters);
  expect(result).toEqual([lessons[2], lessons[0]]);
});

test('should filter by endDate', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: moment(0).add(2, 'days')
  };
  const result = selectLessons(lessons, filters);
  expect(result).toEqual([lessons[0], lessons[1]]);
});

test('should sort by date', () => {
  const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectLessons(lessons, filters);
  expect(result).toEqual([lessons[2], lessons[0], lessons[1]]);
});

test('should sort by year', () => {
  const filters = {
    text: '',
    sortBy: 'year',
    startDate: undefined,
    endDate: undefined
  };
  const result = selectLessons(lessons, filters);
  expect(result).toEqual([lessons[1], lessons[2], lessons[0]]);
});
