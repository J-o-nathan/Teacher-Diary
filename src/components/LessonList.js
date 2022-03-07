import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { startAddLesson } from '../actions/lessons';
import LessonListItem from './LessonListItem';
import selectLessons from '../selectors/lessons';
import { Button } from './Button';
import database from '../firebase/firebase';

export const LessonList = (props) => {

const [error, setError] = useState(false)
const [lessonsDate, setLessonsDate] = useState(0)

// props.lessons will only return the lessons that pass the filters test.
// map these visible lessons to their own <LessonListItem /> in dynamic jsx
// pass in the props for each individual lesson in <LessonListItem />


const sameFilteringDates = props.filteredDateEnd.isSame(props.filteredDateStart, 'day')

const days14Ago = moment(props.filteredDateStart).subtract(14, 'days')
const now = moment(props.filteredDateStart)

console.log(days14Ago)
console.log(now)

console.log(props.lessons)


const onCopy14DaysAgo = () => {
  
    database.ref(`users/${props.uid}/lessons`).once('value').then((snapshot) => {
      const lessons = [];

      snapshot.forEach((childSnapshot) => {
        lessons.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      })
      console.log(lessons)
      return lessons

// GET all the lessons from firebase, then filter for those that were for 14 days ago.

    }).then((lessons) => {

        let days14AgoLessons = lessons.filter(lesson => (moment(lesson.createdAt).isSame(days14Ago, 'day')))
        console.log(days14AgoLessons)
        
        
        if (days14AgoLessons.length === 0) {
          setError(true)
          setLessonsDate(now)
        }

        days14AgoLessons.map((lesson) => {
    
        const copyLesson = {}
        
        copyLesson.note = ''
        copyLesson.createdAt = now.valueOf()
        copyLesson.period = lesson.period
        copyLesson.year = lesson.year
        
        props.startAddLesson(copyLesson)
        
        console.log(copyLesson)
        
      })

    }).catch(error => console.log('Error: ' + error))
}

console.log(lessonsDate)
console.log(error)

const errorIsTrue = !!(error && moment(lessonsDate.valueOf()).isSame(props.filteredDateStart, 'day'))

return (
  
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Lessons</div>
      <div className="show-for-desktop">Lesson</div>
      <div className="show-for-desktop">Year Group</div>
    </div>
    <div className="list-body">
      {
        props.lessons.length === 0 ? (
          <div className="list-item list-item--message" id="no-lessons">
            <p>No lessons found</p>
            {errorIsTrue && <p id="error-14-days-ago">No lessons from 14 days ago</p>}
            {(sameFilteringDates && !errorIsTrue) && <Button onClick={onCopy14DaysAgo} id="copy-button" >Copy 14 days ago</Button>}
          </div>
        ) : 
            props.lessons.map((lesson) => {
              return <LessonListItem key={lesson.id} {...lesson} />;
            })
      }
    </div>
  </div>)
};


const mapStateToProps = (state) => {
  return {
    // Pass in the lessons and the filters for selectLesson. lessons will be an array with all passing items.
    filteredDateStart: state.filters.startDate,
    filteredDateEnd: state.filters.endDate,
    lessons: selectLessons(state.lessons, state.filters),
    uid: state.auth.uid
  };
};

const mapDispatchToProps = (dispatch) => ({
  startAddLesson: (lesson) => dispatch(startAddLesson(lesson))
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonList);
