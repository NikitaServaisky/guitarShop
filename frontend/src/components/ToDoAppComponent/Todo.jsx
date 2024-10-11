import React, { useState } from 'react';
import Calendar from './Calendar'; // Import Calendar
import TaskList from './TaskList'; // Import TaskList
import TaskModal from './TaskModal'; // Import TaskModal

const TodoApp = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true); // Open modal when date is selected
  };

  const handleAddTask = (time, task) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    setTasks((prevTasks) => ({
      ...prevTasks,
      [dateKey]: [...(prevTasks[dateKey] || []), { time, task }],
    }));
  };

  return (
    <div className="todo-app">
      <h2>To-Do List and Details</h2>

      {/* Calendar Component */}
      <Calendar onDateSelect={handleDateChange} />

      {/* TaskList Component */}
      <h3>Tasks for {selectedDate ? selectedDate.toDateString() : 'No Date Selected'}</h3>
      <TaskList tasks={tasks} selectedDate={selectedDate} />

      {/* TaskModal Component */}
      <TaskModal
        isOpen={isModalOpen}
        selectedDate={selectedDate}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default TodoApp;
