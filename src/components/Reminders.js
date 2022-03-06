import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import ReminderList from './ReminderList';
import ReminderInput from './ReminderInput';
import { startAddReminder, startSetReminders, startRemoveReminder } from "../actions/reminders";

const Reminders = (props) => {

  const [courseGoals, setCourseGoals] = useState([]);
  const [loading, setLoading] = useState(true)
  const [clicked, setClicked] = useState(false)

  const addGoalHandler = (enteredText, fn) => {
    startAddReminder(enteredText, props.uid)
    setCourseGoals(prevGoals => {
      const updatedGoals = [...prevGoals];
      updatedGoals.push({ text: enteredText, id: Math.random().toString() });
      fn()
      console.log(updatedGoals)
      return updatedGoals;
    });
  };

  const deleteItemHandler = (id) => {
    startRemoveReminder(id, props.uid)
    setCourseGoals(prevGoals => {
      const updatedGoals = prevGoals.filter(goal => goal.id !== id);
      return updatedGoals;
    });
  };

  const onClickHandler = () => {
    setClicked(() => !clicked)
  }

// useEffect runs to fetch the course goals from firebase and set the state equal to these goals
// Run this useEffect whenever the form is submitted, so you are always rendering the database goals
// Without this you can't create and delete without a page refresh (which fetches them from firebase)
// startSetReminders takes a callback which has access to the reminders array.

  useEffect(() => {
    startSetReminders(props.uid, (reminders) => {
      setCourseGoals(reminders)
      setLoading(false)        
    })
    return () => {
      console.log('cleanup')
    }
  }, [clicked])

  let content = (
    <p style={{ textAlign: 'center' }}>No reminders found.</p>
  );

  if (courseGoals.length > 0) {
    content = (
      <ReminderList items={courseGoals} onDeleteItem={deleteItemHandler} />
    );
  }

  return (
    <div className="content-container">
      <section id="goal-form">
        <ReminderInput onClickHandler={onClickHandler} onAddGoal={addGoalHandler} />
      </section>
      
      {loading ? <h2 className="content-container" id="loading-text">Loading...</h2> : <section id="goals">
        {content}
        {/* {courseGoals.length > 0 && (
          <CourseGoalList
            items={courseGoals}
            onDeleteItem={deleteItemHandler}
          />
        ) // <p style={{ textAlign: 'center' }}>No goals found. Maybe add one?</p>
        } */}
      </section>}
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid
  }
}

export default connect(mapStateToProps)(Reminders)