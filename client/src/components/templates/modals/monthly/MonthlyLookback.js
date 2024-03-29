import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import dayjs from 'dayjs';
import '@twallpaper/react/css';
import { TWallpaper } from '@twallpaper/react';
import { topFourColors } from '../../../../api/MontlyLookbackApi';
import { displayNameSelector } from '../../../../redux/hooks';
import { closeModal } from '../../../../redux/modalSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import * as Style from './Style';

const MonthlyLookback = ({ setHiddenCard }) => {
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
    setHiddenCard(false);
  };

  useEffect(() => {
    const loadData = async () => {
      const topColorArr = await topFourColors(displayName);
      {
        if (topColorArr.length >= 4) {
          setTopColors([
            `${topColorArr[0]}`,
            `${topColorArr[1]}`,
            `${topColorArr[2]}`,
            `${topColorArr[3]}`,
          ]);
          return;
        }
        if (topColorArr.length === 3) {
          setTopColors([
            `${topColorArr[0]}`,
            `${topColorArr[1]}`,
            `${topColorArr[2]}`,
            `${topColorArr[0]}`,
          ]);
          return;
        }
        if (topColorArr.length === 2) {
          setTopColors([
            `${topColorArr[0]}`,
            `${topColorArr[0]}`,
            `${topColorArr[1]}`,
            `${topColorArr[1]}`,
          ]);
          return;
        }
        if (topColorArr.length === 1) {
          setTopColors([
            `${topColorArr[0]}`,
            `${topColorArr[0]}`,
            `${topColorArr[0]}`,
            `${topColorArr[0]}`,
          ]);
          return;
        }
        setTopColors(['#E7AF8D', '#F0DCB1', '#BEB5BF', '#A2A987']); // 값이 안들어왔을 경우 보여지는 임의의 색상
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Style.Contain>
        <Style.MonthlyColor>{`당신의 ${currentMonth}월`}</Style.MonthlyColor>
        <Style.Info data-tip="이번 달 가장 많이 기록한 감정 4가지가 나와요! 저장된 값이 없을 경우 임의의 그라데이션이 보여져요">
          <FontAwesomeIcon icon={faCircleQuestion} />
        </Style.Info>
        <ReactTooltip event="click" eventOff="mouseout" place="right" />
        {topColors && <TWallpaper options={option} />}
        <Style.ButtonContain onClick={handleCloseModal}>
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </Style.ButtonContain>
      </Style.Contain>
    </>
  );
};

export default MonthlyLookback;
