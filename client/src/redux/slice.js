import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  mamberId: -1,
  email: -1,
  displayName: -1,
  moodId: -1,
  paletteCode: -1,
  myPalette: [],
  today: { mood: -1, reason: -1 },
};

const slice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    setMemberId: (state, action) => {
      state.mamberId = action.payload;
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
    setPaletteCode: (state, action) => {
      state.paletteCode = action.payload;
    },
    setMyPalette: (state, action) => {
      state.myPalette = [...state.myPalette, action.payload];
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
  setMemberId,
  setEmail,
  setDisplayName,
  setMoodId,
  setPaletteCode,
  setMyPalette,
  setMood,
  setReason,
} = slice.actions;
export default slice.reducer;
