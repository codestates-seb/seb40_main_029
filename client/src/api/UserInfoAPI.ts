import axios from 'axios';
const serverUrl = process.env.REACT_APP_BASIC_URL;

export const getUserInfo = async memberId => {
  const path = `/members/${memberId}`;
  try {
    const res = await axios.get(serverUrl + path);
    // const res = await axios.get('http://localhost:3001/members?memberId=13');
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
