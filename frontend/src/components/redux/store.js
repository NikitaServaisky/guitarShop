import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice'; // ודא שזה הנתיב הנכון

const store = configureStore({
  reducer: {
    tasks: tasksReducer, // משייכים את ה-reducer
  },
});

export default store;
