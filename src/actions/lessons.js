import database from '../firebase/firebase';

// ADD_LESSON
export const addLesson = (lesson) => ({
  type: 'ADD_LESSON',
  lesson
});

export const startAddLesson = (lessonData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      period = '',
      note = '',
      year = 0,
      createdAt = 0
    } = lessonData;
    const lesson = { period, note, year, createdAt };

    return database.ref(`users/${uid}/lessons`).push(lesson).then((ref) => {
      console.log('posting data: ' + lesson)
      dispatch(addLesson({
        id: ref.key,
        ...lesson
      }));
    });
  };
};

// export const startAddCopyLesson = (lessonData = {}) => {
//   return (dispatch, getState) => {
//   const uid = getState().auth.uid;
//   const {
//     period = '',
//     note = '',
//     year = 0,
//     createdAt = 0
//   } = lessonData
//   const lesson = { period, note, year, createdAt };

//   return database.ref(`users/${uid}/lessons`).push(lesson).then((ref) => {
//     console.log('posting data: ' + lesson)
//     dispatch(addLesson({
//       id: ref.key,
//       ...lesson
//     }))
//   })
//   }
// }

// REMOVE_LESSON
export const removeLesson = ({ id } = {}) => ({
  type: 'REMOVE_LESSON',
  id
});

export const startRemoveLesson = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/lessons/${id}`).remove().then(() => {
      dispatch(removeLesson({ id }));
    });
  };
};

// EDIT_LESSON
export const editLesson = (id, updates) => ({
  type: 'EDIT_LESSON',
  id,
  updates
});

export const startEditLesson = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/lessons/${id}`).update(updates).then(() => {
      dispatch(editLesson(id, updates));
    });
  };
};

// SET_LESSON
export const setLessons = (lessons) => ({
  type: 'SET_LESSONS',
  lessons
});

export const startSetLessons = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/lessons`).once('value').then((snapshot) => {
      const lessons = [];

      snapshot.forEach((childSnapshot) => {
        lessons.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setLessons(lessons));
    });
  };
};


