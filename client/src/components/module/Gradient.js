// 먼저 한달 기록만 조회
// 그 색을 5개씩 묶어서 통계
// 리스트 만들어놓고 적용

import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { displayNameSelector } from '../redux/hooks';

const Gradient = styled.div`
  background: linear-gradient(
      217deg,
      rgba(255, 0, 0, 0.8),
      rgba(255, 0, 0, 0) 70.71%
    ),
    linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%);
`;

export const GetMonth = async () => {
  const displayName = useSelector(displayNameSelector);
  const path = `/mood/month/${displayName}`;

  try {
    const result = await axios.get(process.env.REACT_APP_SERVER_API_URL + path);
    for (let i = 0; i < result.length; i++) {
      let colors = [];
      colors.push(result[i].moodPaletteDetails.colorCode);
      return colors;
    }
    // 요약 {"a":2,"b":2,"c":1}
    const summary = {};
    colors.forEach(x => {
      summary[x] = (summary[x] || 0) + 1;
    });
  } catch (err) {
    throw err;
  }
};

// [
//   {
//       "moodId": 1,
//       "body": "놀자!",
//       "memberId": 1,
//       "moodPaletteDetails": {
//           "moodPaletteDetailsId": 9,
//           "paletteCode": "P002",
//           "moodCode": "m001",
//           "colorCode": "CE7E5D",
//           "mood": "happy"
//       }
//   }
// ]

// .stacked-linear {
//   background:
//       linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
//       linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
//       linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
// }

// ㅅㅐㄱ ㅇㅕㅇ여ㄱ을 퍼퍼센센트트로
