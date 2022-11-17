export const isLoggedInSelector = state => state.userInfo.isLoggedIn;

export const emailSelector = state => state.userInfo.email;

export const displayNameSelector = state => state.userInfo.displayName;

export const moodIdSelector = state => state.userInfo.moodId;

export const moodSelector = state => state.userInfo.today.mood;

export const reasonSelector = state => state.userInfo.today.reason;
