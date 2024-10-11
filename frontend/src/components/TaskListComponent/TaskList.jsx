import React from 'react';

const TaskList = ({ tasks, selectedDate }) => {
  const dateKey = selectedDate?.toISOString().split('T')[0];

  if (!selectedDate || !tasks[dateKey]) {
    return <p>No tasks for the selected date.</p>;
  }

  return (
    <ul>
      {tasks[dateKey].map((item, index) => (
        <li key={index}>
          {item.time} - {item.task}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
