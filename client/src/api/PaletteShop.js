import axios from 'axios';
import { useSelector } from 'react-redux';

export const PaletteList = async () => {
  const path = '/palette';
  try {
    // 팔레트 각 객체 담긴 배열
    const result = await axios.get(process.env.REACT_APP_SERVER_API_URL + path);
    const paletteSet = [];
    for (let i = 0; i < result.length; i += 8)
      paletteSet.push(result.slice(i, i + 8));
    return paletteSet;
  } catch (err) {
    throw err;
  }
};

export const BuyPalette = async () => {
  const path = '/members/{member-id}/{palette-code}';
};
