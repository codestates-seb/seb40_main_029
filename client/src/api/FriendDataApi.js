import axios from 'axios';
const url = 'http://localhost:3001';
// const url = `${process.env.REACT_APP_BASIC_URL}`;

export const getFriends = async () => {
  const res = await axios.get(url + '/friends');
  return res.data;
};

export const getAllPalette = async () => {
  const res = await axios.get(url + '/palette');
  return res.data;
};

export const getSpecificPalette = async ({ paletteCode }) => {
  const res = await axios.get(url + '/palette' + `?paletteCode=${paletteCode}`);
  return res.data;
};

export const getAllMembers = async () => {
  const res = await axios.get(url + '/members');
  return res.data;
};

//추가할 친구 id는?
export const addFriend = async () => {
  const res = await axios.post(url + '/members/addFriend');
  return res.data;
};

//POST /members/{memberId};
