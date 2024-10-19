import React, { useState } from 'react';
import './form.module.css';
import Button from '../buttonComponent/Button';

const Form = ({ fields, onSubmit, children, showImageInput = false }) => {
  const [formData, setFormData] = useState({
    taskName: '',
    description: '',
    date: '',
    time: '',
  });
  const [images, setImages] = useState([]); // הוסף סטייט לתמונות

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? event.target.checked : value,
    }));
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imageArray = Array.from(files);
    setImages(imageArray); // עדכון הסטייט של התמונות
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ ...formData, images }); // שלח גם את התמונות
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <label key={index} htmlFor={field.name}>
          {field.label}
          {field.type === 'textarea' ? ( // בדוק אם סוג השדה הוא textarea
            <textarea
              name={field.name}
              placeholder={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
            />
          ) : field.type === 'file' ? ( // בדוק אם סוג השדה הוא file
            <input
              type="file"
              name={field.name}
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          ) : (
            <input
              type={field.type || 'text'} // השתמש בטקסט כברירת מחדל
              name={field.name}
              placeholder={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
            />
          )}
        </label>
      ))}

      <Button type="submit">{children}</Button>
    </form>
  );
};

export default Form;
