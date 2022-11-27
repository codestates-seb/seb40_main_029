import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  displayName: -1,
  email: -1,
  moodId: -1,
  today: { mood: -1, reason: -1 },
};

const slice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setEmail: (state, action) => {
      return {
        ...state,
        email: action.payload,
      };
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
    default: (state, action) => {
      state;
    },
  },
});

export const {
  setIsLoggedIn,
  setDisplayName,
  setEmail,
  setMoodId,
  setMood,
  setReason,
} = slice.actions;
export default slice.reducer;
