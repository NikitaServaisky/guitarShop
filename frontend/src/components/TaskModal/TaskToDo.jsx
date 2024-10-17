// TaskToDo.jsx
import React, { useState } from 'react';
import Button from '../buttonComponent/Button'; // ייבוא הקומפוננטה

const TaskToDo = ({ date, onClose, onSave }) => {
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState(null);

  // לוג לבדיקת ה-date רק בהתחלה (כדי למנוע רינדור חוזר עם אותו לוג)
  console.log('Initial selected date:', date);

  const displayDate = date instanceof Date ? date.toDateString() : new Date(date).toDateString();

  const handleSave = (event) => {
    event.preventDefault(); // הוסף כאן
    console.log('Task:', task);
    console.log('Time:', time);
    console.log('Image:', image);

    if (task && time) {
      const taskData = { task, date, time };
      console.log('Task Data before saving:', taskData);

      if (image) {
        const imageUrl = URL.createObjectURL(image); // יצירת URL זמני לתמונה
        taskData.imageUrl = imageUrl;
        console.log('Image URL:', imageUrl);
      }

      onSave(taskData); // קריאה לפונקציה ששומרת את המשימה
      console.log('Task saved and modal closed');
      onClose(); // סגירת המודל
    } else {
      alert('Please fill in both the task and time.');
      console.log('Missing task or time');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Task for {displayDate}</h3>
        <input
          type="text"
          placeholder="Task description"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            console.log('Task input:', e.target.value); // לוג כל פעם שה-task משתנה
          }}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
            console.log('Time input:', e.target.value); // לוג כל פעם שה-time משתנה
          }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            console.log('Image selected:', e.target.files[0]); // לוג כל פעם שה-image משתנה
          }}
        />
        <Button onClick={handleSave} label="Save">
          Save
        </Button>
        <Button onClick={onClose} label="Cancel">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default TaskToDo;
