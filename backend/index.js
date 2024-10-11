const express = require('express');
const app = express();
require('dotenv').config(); // Load environment variables
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Use a fallback if the environment variable is not set
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello world! from backend');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// open BACKENDADRESS
