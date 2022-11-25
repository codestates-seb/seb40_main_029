import axios from 'axios';

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

export const BuyPalette = async paletteCode => {
  // const memberId = useSelector(memberIdSelector);
  const memberId = 4; // 임시 멤버아이디
  const path = `/members/buy/${memberId}/${paletteCode}`;

  try {
    const result = await axios.patch(
      process.env.REACT_APP_SERVER_API_URL + path
    );
    console.log(result);
  } catch (err) {
    throw err;
  }
};

export const SetPalette = async paletteCode => {
  const memberId = 4;
  const path = `/members/choice/${memberId}/${paletteCode}`;

  try {
    const result = await axios.patch(
      process.env.REACT_APP_SERVER_API_URL + path
    );
    console.log(result);
  } catch (err) {
    throw err;
  }
};
