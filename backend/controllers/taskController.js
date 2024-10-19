const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    console.log('Received task creation request with:', req.body); // לוג של הבקשה
    console.log('Files received:', req.files); // לוג של התמונות שהתקבלו

    const { title, description, date, time } = req.body;

    // בדיקת קבצים שהועלו
    let imageUrl = [];
    if (req.files && req.files.length > 0) {
      imageUrl = req.files.map((file) => file.path); // יצירת מערך נתיבי תמונות
    }

    // יצירת אובייקט המשימה
    const newTask = new Task({
      title,
      description,
      date,
      time,
      userId: req.user.id, // ודא שיש גישה ל-id של המשתמש
      imageUrl,
    });

    // שמירה למסד נתונים
    const task = await newTask.save();
    console.log('Task saved successfully:', task); // לוג של המשימה שנשמרה
    res.status(201).json(task);
  } catch (error) {
    console.error('Error in createTask:', error); // לוג של השגיאה
    res.status(500).json({ message: 'Error creating task', error });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // משיכת כל המשימות מהמאגר
    res.json(tasks); // החזרת המשימות כ-json
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

// פונקציה לעדכון משימה
const updateTask = async (req, res) => {
  const { id } = req.params; // קבלת ה-ID של המשימה מהפרמטרים
  const { title, description, date, time, imageUrl, completed } = req.body; // כלול את imageUrl

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, date, time, imageUrl, completed },
      { new: true }, // מחזיר את המשימה המעודכנת
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task', error });
  }
};

// פונקציה למחיקת משימה
const deleteTask = async (req, res) => {
  const { id } = req.params; // קבלת ה-ID של המשימה מהפרמטרים

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

module.exports = { createTask, getAllTasks, updateTask, deleteTask };
