import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: '',
  displayName: '',
  moodId: '',
  today: { mood: '', reason: '' },
};

const slice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setMoodId: (state, action) => {
      state.moodId = action.payload;
    },
    setMood: (state, action) => {
      state.today.color = action.payload.color;
    },
    setReason: (state, action) => {
      state.today.reason = action.payload.reason;
    },
  },
});

export const {
  setIsLoggedIn,
  setEmail,
  setDisplayName,
  setMoodId,
  setMood,
  setReason,
} = slice.actions;
export default slice.reducer;
