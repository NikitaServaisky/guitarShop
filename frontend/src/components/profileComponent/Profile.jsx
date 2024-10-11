import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <div>
      <h2>Tasks for Today</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <strong>{task.date}</strong> - {task.task} at {task.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
