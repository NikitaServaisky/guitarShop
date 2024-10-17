import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',

  initialState: [],

  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },

    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;

      const index = state.findIndex((task) => task._id === id);

      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
      }
    },

    setTasks: (state, action) => {
      return action.payload; // עדכון מצב עם המשימות החדשות
    },
  },
});

export const { addTask, updateTask, setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
