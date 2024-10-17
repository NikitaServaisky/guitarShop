const axios = require('axios');

// הגדרת ה-URL שלך
const backendApi = 'http://localhost:3000';

// פונקציה לשליחת בקשה ליצירת משימה
const createTask = async (title, description, date, time) => {
  try {
    const response = await axios.post(
      `${backendApi}/tasks/create`,
      {
        title,
        description,
        date,
        time,
      },
      {
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGZjMDhlMjgxNzlmNjA4NGY4NDU3OCIsImlhdCI6MTcyOTE5MTkzOCwiZXhwIjoxNzI5MTk1NTM4fQ.ShdFsOzH_qKuxDeJvqiQwOOSYg-oQPtKPpb9ryCy5fI', // הכנס כאן את ה-token שלך
        },
      },
    );
    console.log('Task created successfully:', response.data);
  } catch (error) {
    console.error('Error creating task:', error.response ? error.response.data : error.message);
  }
};

// קריאה לפונקציה לדוגמה עם נתונים של משימה חדשה
createTask('New Task Title', 'Description of the new task', new Date(), '12:00');
