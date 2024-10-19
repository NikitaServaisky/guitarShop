const axios = require('axios');
const FormData = require('form-data');

// הגדרת ה-URL של השרת
const backendApi = 'http://localhost:3000';

// פונקציה לשליחת בקשה ליצירת משימה כולל העלאת תמונה
const createTask = async (title, description, date, time, imageUrl) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('time', time);

    // הוספת הקישור לתמונה ל-FormData
    formData.append('images', imageUrl); // 'images' הוא שם השדה עבור העלאת התמונות

    const response = await axios.post(`${backendApi}/tasks/create`, formData, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGZjMDhlMjgxNzlmNjA4NGY4NDU3OCIsImlhdCI6MTcyOTMzODkwNiwiZXhwIjoxNzI5MzQyNTA2fQ.RQ618uIs8Q_jyv8n5g64XNz6VOPj8mfxAcjQYR3Ao2w', // הכנס כאן את ה-token שלך
        ...formData.getHeaders(), // הכותרות של FormData
      },
    });

    console.log('Task created successfully:', response.data);
  } catch (error) {
    console.error('Error creating task:', error.response ? error.response.data : error.message);
  }
};

// קריאה לפונקציה עם נתונים של משימה חדשה וקישור לתמונה
createTask(
  'משימה עם תמונה',
  'תיאור המשימה',
  new Date(),
  '15:00',
  'https://www.freepik.com/free-vector/realistic-blue-sky-background_1341348.htm#query=blue%20sky&position=0&from_view=keyword&track=ais_hybrid&uuid=283175cf-df8a-4510-9b88-d27d57b5350b',
);
