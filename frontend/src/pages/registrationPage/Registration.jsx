import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from '../../components/formComponent/Form';
import axiosInstance from '../../api/axiosInstance'; // Axios instance
import { setCredentials } from '../../components/redux/authSlice'; // פעולה לשמירת נתוני המשתמש

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // שימוש ב־dispatch ל־redux

  const fields = [
    { name: 'firstName', type: 'text', label: 'First Name', required: true }, // שם פרטי
    { name: 'lastName', type: 'text', label: 'Last Name', required: true }, // שם משפחה
    { name: 'email', type: 'email', label: 'Email', required: true }, // דוא"ל
    { name: 'password', type: 'password', label: 'Password', required: true }, // סיסמה
    { name: 'profilePicture', type: 'file', label: 'Profile Picture', required: false }, // תמונת פרופיל (אופציונלי)
  ];

  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    const formObj = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      profilePicture: formData.profilePicture,
    };

    console.log('Form data submitted:', formObj);
    try {
      const response = await axiosInstance.post('/register', formObj);
      const { token, userId } = response.data;

      console.log('Received token:', token); // וודא שהטוקן מתקבל
      dispatch(setCredentials({ token, userId }));
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);
      try {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);
        console.log('Saved token and userId in localStorage successfully.');
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      console.log('Token and userId set in Redux:', token, userId);
      console.log('Token from localStorage:', localStorage.getItem('authToken'));
      console.log('UserId from localStorage:', localStorage.getItem('userId'));
      console.log('Navigating to / after setting credentials...');
      navigate('/');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>Registration Form</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form fields={fields} onSubmit={handleSubmit}>
        Register
      </Form>
    </div>
  );
};

export default Registration;
