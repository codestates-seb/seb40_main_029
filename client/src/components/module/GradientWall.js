import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { TWallpaper } from '@twallpaper/react';
import '@twallpaper/react/css';

const Contain = styled.div`
  position: relative;
  /* z-index: 50; */
  width: 100%;
  height: 100%;
`;

const MonthlyColor = styled.h1`
  position: fixed;
  top: 10px;
  left: 80px;
  opacity: 0.2;
  font-size: 40px;
  letter-spacing: 0.7rem;
`;

const GradientWall = () => {
  const [topColors, setTopColors] = useState();
  const option = {
    fps: 60,
    tails: 30,
    colors: topColors,
  };
  let todayMonth = '11';

  const GetMonth = () => {
    const now = new Date(); // 현재 날짜 및 시간
    return 1 + now.getMonth();
  };

  async function GetColors() {
    const jsonServer = 'http://localhost:4000/moods'; // dataMonth.json 파일 4000번 포트로 열기
    return await axios.get(jsonServer).then(res => {
      let colors = res.data[0].map(x => x.moodPaletteDetails.colorCode);
      // 요약 {"a":2,"b":2,"c":1}
      const summary = {};
      colors.forEach(x => {
        summary[x] = (summary[x] || 0) + 1;
      });
      const sorted = Object.entries(summary).sort((a, b) => b[1] - a[1]);
      const topColor = [];
      for (let el of sorted) {
        topColor.push(el[0]);
      }
      return topColor; // 많은 색 부터 순서대로 있는 배열
    });
  }

  useEffect(() => {
    todayMonth = GetMonth();
    console.log(todayMonth);
    const loadData = async () => {
      const topArr = await GetColors();
      console.log(topArr);
      setTopColors([
        `#${topArr[0]}`,
        `#${topArr[1]}`,
        `#${topArr[2]}`,
        `#${topArr[3]}`,
      ]);
    };

    loadData();
    console.log(topColors);
  }, []);

  console.log('탑칼라' + topColors);

  return (
    <>
      <Contain>
        <MonthlyColor>{'당신의 ' + todayMonth + '월'}</MonthlyColor>
        {topColors && <TWallpaper options={option} />}
      </Contain>
    </>
  );
};

export default GradientWall;
