const axios = require('axios');

// הגדרת ה-URL שלך
const backendApi = 'http://localhost:3000';

// פונקציה לשליחת בקשה לקבלת משימות משתמש
const getUserTasks = async () => {
  try {
    const response = await axios.get(`${backendApi}/tasks/get-all`, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGZjMDhlMjgxNzlmNjA4NGY4NDU3OCIsImlhdCI6MTcyOTE3NTY2MSwiZXhwIjoxNzI5MTc5MjYxfQ.n-Nf-_iNWT5sXU2JGjLOmAi5W2lvjQnCaZf1Lyrt2yA', // אם אתה משתמש באימות, הכנס כאן את ה-token שלך
      },
    });
    console.log('User Tasks:', response.data);
  } catch (error) {
    console.error(
      'Error fetching user tasks:',
      error.response ? error.response.data : error.message,
    );
  }
};

// קריאה לפונקציה
getUserTasks();
