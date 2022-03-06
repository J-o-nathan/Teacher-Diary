import React, { useState, useRef } from 'react';

import { Button } from './Button';

const ReminderInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setIsValid] = useState(true);

  const userInputRef = useRef()

  const goalInputChangeHandler = event => {
    if (event.target.value.trim().length > 0) {
      setIsValid(true);
    }
    setEnteredValue(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      return;
    }
    props.onAddGoal(enteredValue, () => userInputRef.current.value = '');
    props.onClickHandler()
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div
        className={`form-control ${!isValid && 'invalid'}`}
      >
        <label>Reminders</label>
        <input id="reminder-input" autoComplete="off" ref={userInputRef} type="text" onChange={goalInputChangeHandler} />
      </div>
      <Button type="submit" id="reminder-button">Submit</Button>
    </form>
  );
};

export default ReminderInput;
