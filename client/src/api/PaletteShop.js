import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  memberIdSelector,
  paletteCodeSelector,
  myPaletteSelector,
} from '../redux/hooks';
import { setMyPalette, setPaletteCode } from '../redux/slice';

axios.defaults.withCredentials = true;

export const PaletteList = async () => {
  const API_URL = process.env.REACT_APP_SERVER_API_URL;
  const path = '/palette';
  try {
    // 팔레트가 담긴 배열
    await axios.get(API_URL + path).then(res => {
      console.log(res.data);
      const paletteSet = [];
      for (let i = 0; i < res.data.length; i += 8)
        paletteSet.push(res.data.slice(i, i + 8));
      // const paletteSet = {};
      // paletteSet.carousel = res;
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

export const BuyPalette = async ({ paletteCode }) => {
  const dispatch = useDispatch();
  const memberId = useSelector(memberIdSelector);
  const myPalette = useSelector(myPaletteSelector);
  const path = `/members/${memberId}/${paletteCode}`;

  try {
    const result = await axios.patch(
      process.env.REACT_APP_SERVER_API_URL + path
    );
    dispatch(setMyPalette(paletteCode));
    console.log(result);
  } catch (err) {
    throw err;
  }
};

export const SetPalette = async () => {
  const dispatch = useDispatch();
  const memberId = useSelector(memberIdSelector);
  const paletteCode = useSelector(paletteCodeSelector);
  const path = `/members/choice/${memberId}/${paletteCode}`;

  try {
    const result = await axios.patch(
      process.env.REACT_APP_SERVER_API_URL + path
    );
    dispatch(setPaletteCode(paletteCode));
    console.log(result);
  } catch (err) {
    throw err;
  }
};
