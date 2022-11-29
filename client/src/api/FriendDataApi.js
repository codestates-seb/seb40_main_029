import axios from 'axios';
const url = `${process.env.REACT_APP_NGROK_URL}`;
const serverUrl = `${process.env.REACT_APP_BASIC_URL}`;

export const getFriends = async memberId => {
  // const res = await axios.get(serverUrl + '/members/friend' + `/${memberId}`);
  const res = await axios.get(url + '/members/friend' + `/${memberId}`);
  return res.data;
};

export const getAllPalette = async () => {
  const res = await axios.get(url + '/palette');
  return res.data;
};

export const getSpecificPalette = async paletteCode => {
  // const res = await axios.get(serverUrl + `/palette/${paletteCode}`);
  const res = await axios.get(url + `/palette/${paletteCode}`);
  return res.data;
};

export const getAllMembers = async () => {
  // const res = await axios.get(serverUrl + '/members');
  const res = await axios.get(url + '/members');
  return res.data;
};

export const addFriend = async ({
  requesterDisplayName,
  respondentDisplayName,
}) => {
  // const res = await axios.post(serverUrl + '/members/addFriend', {
  //   requesterDisplayName,
  //   respondentDisplayName,
  // });
  const res = await axios.post(url + '/members/addFriend', {
    requesterDisplayName,
    respondentDisplayName,
  });
  return res.data;
};

export const deleteFriend = async friendId => {
  // const res = await axios.delete(serverUrl + `/members/friend/${friendId}`);
  const res = await axios.delete(url + `/members/friend/${friendId}`);
  return res.data;
};
