import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddLesson,
  addLesson,
  editLesson,
  startEditLesson,
  removeLesson,
  startRemoveLesson,
  setLessons,
  startSetLessons
} from '../../actions/lessons';
import lessons from '../fixtures/lessons';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const lessonsData = {};
  lessons.forEach(({ id, period, note, year, createdAt }) => {
    lessonsData[id] = { period, note, year, createdAt };
  });
  database.ref(`users/${uid}/lessons`).set(lessonsData).then(() => done());
});

test('should setup remove lesson action object', () => {
  const action = removeLesson({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_LESSON',
    id: '123abc'
  });
});

test('should remove lesson from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = lessons[2].id;
  store.dispatch(startRemoveLesson({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_LESSON',
      id
    });
    return database.ref(`users/${uid}/lessons/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  });
});

test('should setup edit lesson action object', () => {
  const action = editLesson('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_LESSON',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should edit lesson from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  const id = lessons[0].id;
  const updates = { amount: 21045 };
  store.dispatch(startEditLesson(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_LESSON',
      id,
      updates
    });
    return database.ref(`users/${uid}/lessons/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val().amount).toBe(updates.amount);
    done();
  });
});

test('should setup add lesson action object with provided values', () => {
  const action = addLesson(lessons[2]);
  expect(action).toEqual({
    type: 'ADD_LESSON',
    lesson: lessons[2]
  });
});

test('should add lesson to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const lessonData = {
    period: 3,
    year: 4,
    note: 'Hello',
    createdAt: 1000
  };

  store.dispatch(startAddLesson(lessonData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_LESSON',
      lesson: {
        id: expect.any(String),
        ...lessonData
      }
    });

    return database.ref(`users/${uid}/lessons/${actions[0].lesson.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(lessonData);
    done();
  });
});

test('should add lesson with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const lessonDefaults = {
    period: '',
    year: 0,
    note: '',
    createdAt: 0
  };

  store.dispatch(startAddLesson({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_LESSON',
      expense: {
        id: expect.any(String),
        ...lessonDefaults
      }
    });

    return database.ref(`users/${uid}/lessons/${actions[0].lesson.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(lessonDefaults);
    done();
  });
});

test('should setup set lesson action object with data', () => {
  const action = setLessons(lessons);
  expect(action).toEqual({
    type: 'SET_LESSONS',
    lessons
  });
});

test('should fetch the lessons from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetLessons()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_LESSONS',
      lessons
    });
    done();
  });
});
