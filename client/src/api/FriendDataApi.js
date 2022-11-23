import axios from 'axios';
const url = 'http://localhost:3001';
const serverUrl = `${process.env.REACT_APP_BASIC_URL}`;
axios.defaults.withCredentials = true;

export const getFriends = async () => {
  const res = await axios.get(url + '/friends');
  return res.data;
};

export const getAllPalette = async () => {
  const res = await axios.get(url + '/palette');
  return res.data;
};

// json-server
// export const getSpecificPalette = async ({ paletteCode }) => {
//   const res = await axios.get(url + `/palette?paletteCode=${paletteCode}`);
//   // const res = await axios.get(url + `/palette/${paletteCode}`);
//   return res.data;
// };

export const getSpecificPalette = async paletteCode => {
  const res = await axios.get(serverUrl + `/palette/${paletteCode}`);
  return res.data;
};

export const getAllMembers = async () => {
  const res = await axios.get(url + '/members');
  // const res = await axios.get(url + '/members');
  return res.data;
};

//추가할 친구 id는?
export const addFriend = async ({
  requesterDisplayName,
  respondentDisplayName,
}) => {
  const res = await axios.post(url + '/members/addFriend');
  return res.data;
};

export const deleteFriend = async ({ friendId }) => {
  const res = await axios.delete(url + `/friends/${friendId}`);
  return res.data;
};
