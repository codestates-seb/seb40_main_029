// 먼저 한달 기록만 조회
// 그 색을 5개씩 묶어서 통계 or 색 영역을 퍼센트로
// 리스트 만들어놓고 적용
import axios from 'axios';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

const GradientScreen = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      217deg,
      rgba(255, 0, 0, 0.8),
      rgba(255, 0, 0, 0) 70.71%
    ),
    linear-gradient(127deg, rgba(0, 255, 0, 0.8), rgba(0, 255, 0, 0) 70.71%),
    linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%);
`;

// background: `linear-gradient(to right, ${blue[200]}, ${blue[700])}`,

const MonthlyColor = styled.h1`
  padding: 0;
  margin: 0;
  opacity: 0.2;
  font-size: 30px;
  letter-spacing: 0.7rem;
`;

const GetMonth = async () => {
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

const Gradient = () => {
  return (
    <GradientScreen>
      <MonthlyColor>당신의 10월</MonthlyColor>
    </GradientScreen>
  );
};

export default Gradient;
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
