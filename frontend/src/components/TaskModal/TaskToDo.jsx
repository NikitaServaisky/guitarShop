import React, { useState } from 'react';

const TaskToDo = ({ date, onClose, onSave }) => {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');

  const handleSave = () => {
    if (task && time) {
      onSave({ task, date, time });
      onClose();
    } else {
      alert('Please fill in both the task and time.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Task for {date}</h3>
        <input
          type="text"
          placeholder="Task description"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskToDo;
