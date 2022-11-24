// 먼저 한달 기록만 조회
// 그 색을 5개씩 묶어서 통계 or 색 영역을 퍼센트로
// 리스트 만들어놓고 적용
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// E7AF8D 가 10개 33%
// E08890 가 7개 23%
// F0DCB1 5개 16%
//  A2A987 3개 10%

const colors = keyframes`
 0% {
      transform: translateY(400px); // 이 top 기준으로 400px 내려간 곳에서 시작할거다
      opacity: 0; // 처음에는 가려놓고 
    }
100% {
      transform: translateY(0px);   // 그리고 도착지는 원래 지점
      opacity: 1; // 마지막에 슬슬 보여주기
    }
`;

// % 계산한 뒤 2배
const GradientScreen = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(0deg, #beb5bf, #beb5bf66 20%),
    linear-gradient(0deg, #a2a987, #a2a98766 20%),
    linear-gradient(0deg, #f0dcb1, #f0dcb166 32%),
    linear-gradient(0deg, #e08890, #e0889066 36%),
    linear-gradient(0deg, #e7af8d, #e7af8d66 66%);
  animation: ${colors} 3s ease infinite linear alternate;
`;

// background: linear-gradient(217deg, #e7af8d, #e7af8d1a 66%),
// linear-gradient(150deg, #e08890, #e088901a 36%),
// linear-gradient(336deg, #f0dcb1, #f0dcb11a 32%),
// linear-gradient(36deg, #a2a987, #a2a9871a 20%),
// linear-gradient(0deg, #beb5bf, #beb5bf1a 20%);

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
    const number = Object.keys(colors);
    const total = 0;
    number.forEach(x => (total += x));
  } catch (err) {
    throw err;
  }
};

const Gradient = () => {
  return (
    <div>
      <GradientScreen>
        <MonthlyColor>당신의 10월</MonthlyColor>
      </GradientScreen>
    </div>
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

// 기분이 30개
// 기쁨 10개 설렘 7개 평온 5개 평온 5개 걱정 3개
// E7AF8D 가 10개 33%
// E08890 가 7개 23%
// F0DCB1 5개 16%
//  A2A987 3개 10%

// background: linear-gradient(
//   217deg,
//   /* 우측 위 빨강 */ rgba(255, 0, 0, 0.8),
//   rgba(255, 0, 0, 0) 70.71%
// ),
// linear-gradient(
//   127deg,
//   /* 좌측 위 초록 */ rgba(0, 255, 0, 0.8),
//   rgba(0, 255, 0, 0) 70.71%
// ),
// linear-gradient(336deg, rgba(0, 0, 255, 0.8), rgba(0, 0, 255, 0) 70.71%);
