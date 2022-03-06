import lessonsReducer from '../../reducers/lessons';
import lessons from '../fixtures/lessons';

test('should set default state', () => {
  const state = lessonsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove lesson by id', () => {
  const action = {
    type: 'REMOVE_LESSON',
    id: lessons[1].id
  };
  const state = lessonsReducer(lessons, action);
  expect(state).toEqual([lessons[0], lessons[2]]);
});

test('should not remove lessons if id not found', () => {
  const action = {
    type: 'REMOVE_LESSON',
    id: '-1'
  };
  const state = lessonsReducer(lessons, action);
  expect(state).toEqual(lessons);
});

test('should add an lesson', () => {
  const lesson = {
    id: '109',
    period: 1,
    note: '',
    createdAt: 20000,
    year: 9
  };
  const action = {
    type: 'ADD_LESSON',
    lesson
  };
  const state = lessonsReducer(lessons, action);
  expect(state).toEqual([...lessons, lesson]);
});

test('should edit a lesson', () => {
  const year = 1;
  const action = {
    type: 'EDIT_LESSON',
    id: lessons[1].id,
    updates: {
      year
    }
  };
  const state = lessonsReducer(lessons, action);
  expect(state[1].amount).toBe(amount);
});

test('should not edit a lesson if id not found', () => {
  const year = 2;
  const action = {
    type: 'EDIT_LESSON',
    id: '-1',
    updates: {
      year
    }
  };
  const state = lessonsReducer(lessons, action);
  expect(state).toEqual(lessons);
});

test('should set lessons', () => {
  const action = {
    type: 'SET_LESSONS',
    expenses: [lessons[1]]
  };
  const state = lessonsReducer(lessons, action);
  expect(state).toEqual([lessons[1]]);
});
