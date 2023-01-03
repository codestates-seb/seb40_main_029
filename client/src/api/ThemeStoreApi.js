import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;
const API_URL = process.env.REACT_APP_BASIC_URL;
// const API_URL = process.env.REACT_APP_JSON_URL;

export const PaletteList = async () => {
  const path = '/palette';
  try {
    // 팔레트가 담긴 배열
    const result = await axios.get(API_URL + path);
    const paletteSet = [];
    for (let i = 0; i < result.data.length; i += 8) {
      paletteSet.push(result.data.slice(i, i + 8));
    }
    return paletteSet;
  } catch (err) {
    throw err;
  }
};

export const BuyPalette = async (paletteCode, memberId) => {
  // console.log(memberId);
  const path = `/members/buy/${memberId}/${paletteCode}`;

  try {
    const result = await axios.patch(API_URL + path);
    // console.log(result);
    if (result.status == 200) {
      return true;
    } else if (result.status == 204) {
      toast('아쉽지만 포인트가 부족해요');
      return false;
    }
  } catch (err) {
    throw err;
  }
};

export const SetPalette = async (paletteCode, memberId) => {
  // console.log(memberId);
  const path = `/members/choice/${memberId}/${paletteCode}`;

  try {
    const result = await axios.patch(API_URL + path);
    // console.log(result);
  } catch (err) {
    throw err;
  }
};
