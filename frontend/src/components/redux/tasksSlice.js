import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const onCompleteTask = (taskId) => {
  console.log('Completing task:', taskId); // בדוק שאתה מקבל את ה-taskId הנכון
  dispatch(completeTask(taskId));
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    completeTask: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = true;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, completeTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
