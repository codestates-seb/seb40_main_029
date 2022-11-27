import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { TWallpaper } from '@twallpaper/react';
import '@twallpaper/react/css';
import { useSelector } from 'react-redux';

const Contain = styled.div`
  width: 100vh;
  height: 100vh;
`;

const GradientWall = () => {
  const [topColors, setTopColors] = useState([
    '#BEB5BF',
    '#A9C0C5',
    '#E7AF8D',
    '#E7AF8D',
  ]);
  const option = {
    fps: 60,
    tails: 30,
    colors: topColors,
  };

  // const GetMonth = async () => {
  //   const displayName = useSelector(displayNameSelector);
  //   const now = new Date(); // 현재 날짜 및 시간
  //   const month = now.getMonth();
  //   const jsonServer = 'http://localhost:4000/moods';
  // const path = `/mood/month/${displayName}/${month}`;

  // try {
  // axios.get(jsonServer).then(res => console.log(res));
  // for (let i = 0; i < result.length; i++) {
  //   let colors = [];
  //   colors.push(result[i].moodPaletteDetails.colorCode);
  //   return colors;
  // }
  // // 요약 {"a":2,"b":2,"c":1}
  // const summary = {};
  // colors.forEach(x => {
  //   summary[x] = (summary[x] || 0) + 1;
  // });
  // const sorted = Object.entries(summary).sort((a, b) => b[1] - a[1]);
  // const topFour = [];
  // for (let el of sorted) {
  //   topFour.push(el[0]);
  //   console.log(el[0] + ':' + el[1]);
  // }
  // console.log(topFour);
  // const number = Object.keys(colors);
  // const total = 0;
  // number.forEach(x => (total += x));
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // useEffect(() => GetMonth(), []);

  return (
    <Contain>
      <TWallpaper options={option} />
    </Contain>
  );
};

export default GradientWall;

// [
//   {
//     "moodId": 1,
//     "body": "밥먹자!!!!!",
//     "memberId": 1,
//     "moodPaletteDetails": {
//         "moodPaletteDetailsId": 1,
//         "paletteCode": "P001",
//         "moodCode": "m001",
//         "colorCode": "EE8242",
//         "mood": "기쁨"
//     },
//     "createdAt": "2022-11-24T10:40:01.616384"
// }
// ]
