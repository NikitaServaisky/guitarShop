import axios from 'axios';
import { backendApi } from './api'; // אם יש לך קובץ שמגדיר את ה-backendApi

const axiosInstance = axios.create({
  baseURL: backendApi || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// הוסף אינטרספטור שידאג להוסיף את ה-Authorization header לפני כל בקשה
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId'); // קבלת ה-ID של המשתמש

    // הוסף לוגים למעקב
    console.log('Sending request to:', config.url);
    console.log('Token:', token);
    console.log('User ID:', userId);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found!');
    }

    if (userId) {
      config.headers['X-User-Id'] = userId;
    }

    return config;
  },
  (error) => {
    // טיפול בשגיאות של אינטרספטור
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
