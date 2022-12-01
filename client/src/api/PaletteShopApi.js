import axios from 'axios';
import { useSelector } from 'react-redux';
import { memberIdSelector } from '../redux/hooks';

axios.defaults.withCredentials = true;

export const PaletteList = async () => {
  const API_URL = process.env.REACT_APP_BASIC_URL;
  const path = '/palette';
  try {
    // 팔레트가 담긴 배열
    await axios.get(API_URL + path).then(res => {
      console.log(res.data);
      const paletteSet = [];
      for (let i = 0; i < res.data.length; i += 8)
        paletteSet.push(res.data.slice(i, i + 8));
      console.log(paletteSet);
      const temp = {};
      temp.carousel = paletteSet;
      console.log(temp);
      return temp;
    });
  } catch (err) {
    throw err;
  }
};

export const BuyPalette = async (paletteCode, memberId) => {
  console.log(memberId);
  const path = `/members/buy/${memberId}/${paletteCode}`;

  try {
    const result = await axios.patch(process.env.REACT_APP_BASIC_URL + path);
    console.log(result);
    if (result.status == 200) {
      return true;
    } else if (result.status == 204) {
      alert('아쉽지만 포인트가 부족해요');
      return false;
    }
  } catch (err) {
    throw err;
  }
};

export const SetPalette = async (paletteCode, memberId) => {
  console.log(memberId);
  const path = `/members/choice/${memberId}/${paletteCode}`;

  try {
    const result = await axios.patch(process.env.REACT_APP_BASIC_URL + path);
    console.log(result);
  } catch (err) {
    throw err;
  }
};
