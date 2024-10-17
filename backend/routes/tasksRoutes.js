const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createTask);
router.get('/get-all', authMiddleware, getTasks);

module.exports = router;
