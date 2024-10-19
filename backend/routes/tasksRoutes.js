const express = require('express');
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');
const router = express.Router();

// כתובת ליצירת משימה
router.post('/create', authMiddleware, upload.array('images', 10), createTask);

// כתובת לקבלת כל המשימות
router.get('/get-all', authMiddleware, getAllTasks);

// כתובת לעדכון משימה
router.put('/update/:id', authMiddleware, updateTask); // מוסיף את אפשרות העדכון

// כתובת למחיקת משימה
router.delete('/delete/:id', authMiddleware, deleteTask); // מוסיף את אפשרות המחיקה

module.exports = router;
