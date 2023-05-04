import axios from 'axios';

export const getPoint = async memberId => {
  const getURL = process.env.REACT_APP_BASIC_URL;
  const path = `/members/${memberId}`;
  const res = await axios.get(getURL + path);
  return res.data.point;
};
