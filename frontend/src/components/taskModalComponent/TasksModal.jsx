import React, { useState, useEffect } from 'react';
import './TaskModal.css';
import Form from '../formComponent/Form';

const TaskModal = ({ show, onClose, onSave, selectedDate }) => {
  const [images, setImages] = useState([]);

  // עדכון התאריך שנבחר
  useEffect(() => {
    // אם נבחר תאריך, אתה יכול להכניס את התאריך לשדה הטקסט במודל
  }, [selectedDate]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (formData) => {
    const task = {
      ...formData,
      date: selectedDate,
      images, // ודא שהשדה הזה מכיל את התמונות
    };
    onSave(task);
    setImages([]); // לנקות את השדות
    onClose();
  };

  if (!show) return null;

  const fields = [
    { name: 'taskName', label: 'Task Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: false },
    { name: 'time', label: 'Time', type: 'time', required: false },
    {
      name: 'images',
      label: 'Upload Images',
      type: 'file',
      required: false,
      onChange: handleImageChange,
    }, // שדה לקובץ
  ];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Task</h2>
        <Form fields={fields} onSubmit={handleSubmit}>
          Save Task
        </Form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default TaskModal;
