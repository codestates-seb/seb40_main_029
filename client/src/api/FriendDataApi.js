import axios from 'axios';
const serverUrl = `${process.env.REACT_APP_BASIC_URL}`;

export const getFriends = async memberId => {
  const res = await axios.get(serverUrl + '/members/friend' + `/${memberId}`);
  return res.data;
};

export const getAllPalette = async () => {
  const res = await axios.get(serverUrl + '/palette');
  return res.data;
};

export const getSpecificPalette = async paletteCode => {
  const res = await axios.get(serverUrl + `/palette/${paletteCode}`);
  return res.data;
};

export const getAllMembers = async () => {
  const res = await axios.get(serverUrl + '/members');
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
  return res.data;
};

export const deleteFriend = async friendId => {
  const res = await axios.delete(serverUrl + `/members/friend/${friendId}`);
  return res.data;
};
