import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import axios from 'axios';
import ReactTooltip from 'react-tooltip';
import dayjs from 'dayjs';
import { topFourColors } from '../../api/MontlyLookbackApi';
import { displayNameSelector } from '../../redux/hooks';
import { closeModal } from '../../redux/modalSlice';
import { TWallpaper } from '@twallpaper/react';
import '@twallpaper/react/css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Contain = styled.div`
  position: relative;
  z-index: 50;
  width: 100%;
  height: 100%;
`;

const MonthlyColor = styled.h1`
  position: fixed;
  top: 0px;
  left: 50px;
  opacity: 0.2;
  font-size: 40px;
  letter-spacing: 0.7rem;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  opacity: 0.3;
  padding: 0 7px;
`;

const Info = styled(Button)`
  position: fixed;
  font-size: 17px;
  top: 57px;
  left: 310px;
  cursor: pointer;
`;

const ButtonContain = styled.span`
  position: fixed;
  top: 30px;
  right: 30px;
  cursor: pointer;
  opacity: 0.4;
`;

const MonthlyLookback = () => {
  const dispatch = useDispatch();
  const [topColors, setTopColors] = useState();
  const currentMonth = dayjs(new Date()).format('MM');
  const displayName = useSelector(displayNameSelector);
  const option = {
    fps: 60,
    tails: 30,
    colors: topColors,
  };

  // async function GetColors() {
  //   const jsonServer = 'http://localhost:4000/moods'; // client 폴더에서 json-server ./data/dataMonth.json --port 4000 실행
  //   return await axios.get(jsonServer).then(res => {
  //     let colors = res.data[0].map(x => x.moodPaletteDetails.colorCode);
  //     // 요약 {"a":2,"b":2,"c":1}
  //     const summary = {};
  //     colors.forEach(x => {
  //       summary[x] = (summary[x] || 0) + 1;
  //     });
  //     const sorted = Object.entries(summary).sort((a, b) => b[1] - a[1]);
  //     const topColor = [];
  //     for (let el of sorted) {
  //       topColor.push(el[0]);
  //     }
  //     return topColor; // 많은 색 부터 순서대로 있는 배열
  //   });
  // }

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const loadData = async () => {
      const topColorArr = await topFourColors(displayName);
      {
        topColorArr
          ? setTopColors([
              `#${topColorArr[0]}`,
              `#${topColorArr[1]}`,
              `#${topColorArr[2]}`,
              `#${topColorArr[3]}`,
            ])
          : setTopColors(['#E7AF8D', '#F0DCB1', '#BEB5BF', '#A2A987']); // 값이 안들어왔을 경우 보여지는 임의의 색상
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Contain>
        <MonthlyColor>{`당신의 ${currentMonth}월`}</MonthlyColor>
        <Info data-tip="이번 달 가장 많이 기록한 감정 4가지가 나와요">
          <FontAwesomeIcon icon={faCircleQuestion} />
        </Info>
        <ReactTooltip event="click" eventOff="mouseout" place="right" />
        {topColors && <TWallpaper options={option} />}
        <ButtonContain onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </ButtonContain>
      </Contain>
    </>
  );
};

export default MonthlyLookback;
