import axios from 'axios';
const serverUrl = process.env.REACT_APP_BASIC_URL;
const mockUrl = 'http://localhost:3001';

export const getFriends = async memberId => {
  const res = await axios.get(serverUrl + '/members/friend' + `/${memberId}`);
  // const res = await axios.get(mockUrl + '/friend');
  return res.data;
};

export const getAllPalette = async () => {
  const res = await axios.get(serverUrl + '/palette');
  // const res = await axios.get(mockUrl + '/palette');
  return res.data;
};

export const getSpecificPalette = async paletteCode => {
  const res = await axios.get(serverUrl + `/palette/${paletteCode}`);
  // const res = await axios.get(mockUrl + `/palette?paletteCode=${paletteCode}`);
  return res.data;
};

export const getAllMembers = async () => {
  const res = await axios.get(serverUrl + '/members');
  // const res = await axios.get(mockUrl + '/members');
  return res.data;
};

export const addFriend = async ({
  requesterDisplayName,
  respondentDisplayName,
}) => {
  const res = await axios.post(serverUrl + '/members/addFriend', {
    requesterDisplayName,
    respondentDisplayName,
  });
  // const res = await axios.post(mockUrl + '/friend', {
  //   requesterDisplayName,
  //   respondentDisplayName,
  // });
  return res.data;
};

export const deleteFriend = async friendId => {
  const res = await axios.delete(serverUrl + `/members/friend/${friendId}`);
  // const res = await axios.delete(mockUrl + `/friend/${friendId}`);
  return res.data;
};
