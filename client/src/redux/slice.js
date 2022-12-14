import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  memberId: -1,
  displayName: '익명의 사용자',
  email: '',
  moodId: -1,
  paletteCode: 'P001', // 적용한 팔레트
  myPalette: ['P001'], // 보유한 팔레트
  today: { mood: -1, reason: -1 },
};

const slice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setMemberId: (state, action) => {
      state.memberId = action.payload;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
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
    setMyPaletteDevice: (state, action) => {
      state.myPalette = action.payload;
    },
    setMood: (state, action) => {
      state.today.mood = action.payload.mood;
      state.today.reason = action.payload.reason;
    },
    setReason: (state, action) => {
      state.today.reason = action.payload.reason;
    },
    default: (state, action) => {
      return state;
    },
  },
});

export const {
  setMemberId,
  setDisplayName,
  setEmail,
  setMoodId,
  setPaletteCode,
  setMyPalette,
  setMyPaletteDevice,
  setMood,
  setReason,
} = slice.actions;
export default slice.reducer;
