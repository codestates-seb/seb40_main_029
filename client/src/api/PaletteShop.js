import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { memberIdSelector, paletteCodeSelector } from '../redux/hooks';

export const PaletteList = async () => {
  const path = '/palette';
  try {
    // 팔레트가 담긴 배열
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
  const dispatch = useDispatch();
  const memberId = useSelector(memberIdSelector);
  const paletteCode = useSelector(paletteCodeSelector);
  const path = `/members/${memberId}/${paletteCode}`;

  try {
    const result = await axios.patch(
      process.env.REACT_APP_SERVER_API_URL + path
    );
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
  } catch (err) {
    throw err;
  }
};
