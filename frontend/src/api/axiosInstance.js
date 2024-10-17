import axios from 'axios';
import { backendApi } from './api'; // אם יש לך קובץ שמגדיר את ה-backendApi

const axiosInstance = axios.create({
  baseURL: backendApi || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// הוסף אינטרספטור שידאג להוסיף את ה-Authorization header לפני כל בקשה
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  console.log('Sending token:', token); // הוסף כאן לוג
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
