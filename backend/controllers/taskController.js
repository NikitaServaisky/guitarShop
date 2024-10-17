const Task = require('../models/Task');

const createTask = async (req, res) => {
  try {
    const { title, description, date, time, imageUrl } = req.body; // כלול את imageUrl
    const task = new Task({ title, description, date, time, userId: req.user.id, imageUrl });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    console.log('Fetched tasks for user:', req.user.id); // לוג
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error); // לוג של שגיאה
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

module.exports = { createTask, getTasks };
