import React, { useState } from 'react';
import Calendar from './Calendar';
import TaskList from './TaskList';

const SyncComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // כאן תוכל להוסיף לוגיקה למשיכת משימות עבור התאריך הנבחר
    fetchTasksForDate(date);
  };

  const fetchTasksForDate = (date) => {
    // כאן תוכל למשוך את המשימות מהשרת עבור התאריך הנבחר
    // ולהעדכן את ה-state של tasks
  };

  return (
    <div>
      <Calendar onDateChange={handleDateChange} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default SyncComponent;
