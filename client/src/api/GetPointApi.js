import axios from 'axios';

export const GetPoint = async memberId => {
  const getURL = process.env.REACT_APP_BASIC_URL;
  const path = `/members/${memberId}`;
  return await axios.get(getURL + path).then(res => {
    // console.log(res.data.point);
    return res.data.point;
  });
};
