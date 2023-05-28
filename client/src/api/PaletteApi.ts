import axios from 'axios';
const serverUrl = process.env.REACT_APP_BASIC_URL;
const mockUrl = 'http://localhost:3001';

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
