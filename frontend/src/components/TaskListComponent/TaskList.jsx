// TaskList.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks); // קבלת המשימות מהסטייט של רידוקס

  return (
    <div>
      <h2>Your Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.date} - {task.time}
            {/* הוסף כאן כל מידע נוסף שתרצה להציג */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
