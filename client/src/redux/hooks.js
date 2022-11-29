export const memberIdSelector = state => state.userInfo.memberId;

export const emailSelector = state => state.userInfo.email;

export const displayNameSelector = state => state.userInfo.displayName;

export const moodIdSelector = state => state.userInfo.moodId;

export const paletteCodeSelector = state => state.userInfo.paletteCode;

export const myPaletteSelector = state => state.userInfo.myPalette;

export const moodSelector = state => state.userInfo.today.mood;

export const reasonSelector = state => state.userInfo.today.reason;
