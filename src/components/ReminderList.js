import React from 'react';
import ReminderItem from './ReminderItem';

const ReminderList = props => {
  return (
    <ul className="goal-list">
      {props.items.map(goal => (
        <ReminderItem
          key={goal.id}
          id={goal.id}
          onDelete={props.onDeleteItem}
        >
          {goal.text}
        </ReminderItem>
      ))}
    </ul>
  );
};

export default ReminderList;
