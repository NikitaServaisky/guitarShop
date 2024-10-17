// TodoApp.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, setTasks } from '../redux/tasksSlice';
import Calendar from '../CalendarComponent/Calendar';
import TaskList from '../TaskListComponent/TaskList';
import TaskToDo from '../TaskModal/TaskToDo'; // ייבוא של ה-TaskToDo
import axiosInstance from '../../api/axiosInstance'; // עדכן את הנתיב ל-axios

const TodoApp = () => {
  const dispatch = useDispatch();

  const handleAddTask = async (taskData) => {
    console.log('Task Data received in onSave:', taskData);

    const { task, date, time, imageUrl } = taskData;
    const dateKey = new Date(date).toISOString().split('T')[0];

    try {
      console.log('Sending POST request to /tasks/create with data:', {
        title: task,
        date: dateKey,
        time,
        imageUrl,
      });

      const response = await axiosInstance.post('/tasks/create', {
        title: task,
        date: dateKey,
        time,
        imageUrl,
      });

      console.log('Response from server after adding task:', response.data);

      // לוג לפני הקריאה ל-addTask
      console.log('Dispatching addTask with:', response.data);
      dispatch(addTask(response.data)); // כאן הוספת המשימה
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get('/tasks/get-all');
      console.log('Response from server for fetching tasks:', response.data);

      // כאן אנחנו שולחים את כל המשימות ל-Redux
      dispatch(setTasks(response.data));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // קריאה לפונקציה מיד כשנטען ה-Component
  }, []);

  return (
    <div>
      {/* היכנס למודל של ניהול משימות */}
      <TaskToDo
        date={new Date()}
        onClose={() => {
          /* סגור את המודל */
        }}
        onSave={handleAddTask}
      />
      <TaskList /> {/* תציג את המשימות */}
    </div>
  );
};

export default TodoApp;
