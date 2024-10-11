import React from 'react';
import Form from '../../components/formComponent/Form';
import Button from '../../components/buttonComponent/Button';

const Registration = () => {
  const fields = [
    { nama: 'username:', type: 'text', label: 'User name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true },
    { name: 'password', type: 'password', label: 'Password', required: true },
    { name: 'dateofbirth', type: 'dateofbirth', label: 'Date of Birth:', required: true },
  ];

  const handleSubmit = (formData) => {
    console.log('Registration Form Submitted:', formData);
  };
  return (
    <div>
      <h2>Registration Form</h2>
      <Form fields={fields} onSubmit={handleSubmit}>
        Register
      </Form>
    </div>
  );
};

export default Registration;
