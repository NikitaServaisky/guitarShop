import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userId, token } = action.payload;
      state.userId = userId;
      state.token = token;

      // שמירת טוקן ויוזר איידי בלוקל סטורג'
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;

      // הסרת המידע מ־localStorage בעת התנתקות
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
