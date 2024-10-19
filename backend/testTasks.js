const axios = require('axios');

// הגדרת ה-URL שלך
const backendApi = 'http://localhost:3000';

// פונקציה לשליחת בקשה לקבלת משימות משתמש
const getUserTasks = async () => {
  try {
    const response = await axios.get(`${backendApi}/tasks/get-all`, {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGZjMDhlMjgxNzlmNjA4NGY4NDU3OCIsImlhdCI6MTcyOTI3MTI1NywiZXhwIjoxNzI5Mjc0ODU3fQ.aEOqpHaMJYd2F1Ay8rSm9qB-bkmDuanNBZYY3d-T_EY', // אם אתה משתמש באימות, הכנס כאן את ה-token שלך
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
