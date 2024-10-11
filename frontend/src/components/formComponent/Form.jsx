import React, { useState } from 'react';
import './form.module.css';
import Button from '../buttonComponent/Button';

const Form = ({ fields, onSubmit, children }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData); // Pass the form data to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field, index) => (
        <label key={index} htmlFor={field.name}>
          {field.label}
          {field.type === 'dateofbirth' ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="number"
                name="day"
                placeholder="Day"
                min="1"
                max="31"
                value={formData.day || ''}
                onChange={handleChange}
                required={field.required}
              />
              <input
                type="number"
                name="month"
                placeholder="Month"
                min="1"
                max="12"
                value={formData.month || ''}
                onChange={handleChange}
                required={field.required}
              />
              <input
                type="number"
                name="year"
                placeholder="Year"
                min="1900"
                max={new Date().getFullYear()}
                value={formData.year || ''}
                onChange={handleChange}
                required={field.required}
              />
            </div>
          ) : (
            <input
              type={field.type}
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
