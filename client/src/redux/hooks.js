export const isLoggedInSelector = state => state.userInfo.isLoggedIn;

export const emailSelector = state => state.userInfo.email;

export const displayNameSelector = state => state.userInfo.displayName;

export const colorSelector = state => state.userInfo.today.color;

export const reasonSelector = state => state.userInfo.today.reason;
