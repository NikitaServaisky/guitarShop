import React, { useState } from 'react';
import './Calendar.css';
import TaskModal from '../taskModalComponent/TasksModal';
import axiosInstance from '../../api/axiosInstance';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';

const Calendar = ({ onDataChange }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDateClick = (date) => {
    onDataChange(date); // אפשר לוודא שהפונקציה הזו מבצעת קריאה לשרת כדי לעדכן את הסטייט
  };

  const handleDayClick = (day) => {
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1,
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(formattedDate);
    setShowModal(true);
  };

  const handleSaveTask = async (task) => {
    console.log('handleSaveTask called with:', task);

    const formData = new FormData();
    formData.append('title', task.taskName);
    formData.append('description', task.description);
    formData.append('time', task.time);
    formData.append('date', task.date);

    // נוודא שה-images מוגדר תמיד (ואפילו אם הוא ריק)
    if (task.images && task.images.length > 0) {
      task.images.forEach((image) => {
        formData.append('images', image);
      });
    } else {
      console.warn('No images to upload.');
    }

    try {
      const response = await axiosInstance.post('/tasks/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Task saved:', response.data);
      dispatch(addTask(response.data)); // dispatch addTask to Redux
      setShowModal(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const renderDays = () => {
    const days = [];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const totalDays = lastDayOfMonth.getDate();

    for (let i = 1; i <= totalDays; i++) {
      days.push(
        <div key={i} className="day" onClick={() => handleDayClick(i)}>
          {i}
        </div>,
      );
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <div className="calendar">
      <header>
        <button onClick={handlePrevMonth}>קודם</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={handleNextMonth}>הבא</button>
      </header>
      <div className="days-of-week">
        {daysInWeek.map((day, index) => (
          <div key={index} className="daysofweek">
            {day}
          </div>
        ))}
      </div>
      <div className="days">{renderDays()}</div>

      <TaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveTask}
        selectedDate={selectedDate} // העברת התאריך שנבחר למודל
      />
    </div>
  );
};

export default Calendar;
