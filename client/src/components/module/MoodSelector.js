import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import MoodCard from './MoodCard';
import SelectorCard from './SelectorCard';

const URL2 = 'http://ec2-15-165-76-0.ap-northeast-2.compute.amazonaws.com:8080';

const MoodSelector = ({ fade }) => {
  useEffect(() => {
    axios
      .get(URL2 + '/mood/year/회원1/2022')
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.status));
  }, []);

  const palet = [
    ['#EE8242', '기쁨'],
    ['#EE8686', '분노'],
    ['#E6AACB', '설렘'],
    ['#D2CCC2', '걱정'],
    ['#FFE27A', '평온'],
    ['#6868AC', '예민'],
    ['#9FC1EE', '슬픔'],
    ['#A7CF99', '희망'],
  ];

  const [idx, setIdx] = useState(0);
  const [darkmode, setDarkmode] = useState(false);

  const toRight = () => {
    setIdx((idx + 1) % 8);
  };
  const toLeft = () => {
    if (idx === 0) {
      setIdx(7);
      return;
    }
    setIdx((idx - 1) % 8);
  };

  return (
    <SelectorContainer color={palet[idx][0]} fade={fade}>
      <Slider fade={fade}>
        <SelectorCard
          darkmode={darkmode}
          palet={palet}
          idx={idx}
          toLeft={toLeft}
          toRight={toRight}
          setDarkmode={setDarkmode}
          fade={fade}
        />
        <MoodCard fade={fade} />
      </Slider>
    </SelectorContainer>
  );
};

export default MoodSelector;

// <Wrapper>
//   <Selector>
//     <LeftRightContainer>
//       <LeftRight darkmode={darkmode}>
//         <FontAwesomeIcon icon={faChevronLeft} onClick={() => toLeft()} />
//       </LeftRight>
//     </LeftRightContainer>
//     <Mood darkmode={darkmode}>
//       <Type darkmode={darkmode}>{palet[idx][1]}</Type>
//     </Mood>
//     <LeftRightContainer>
//       <LeftRight darkmode={darkmode}>
//         <FontAwesomeIcon
//           icon={faChevronRight}
//           onClick={() => toRight()}
//         />
//       </LeftRight>
//     </LeftRightContainer>
//   </Selector>
//   <Today darkmode={darkmode}>{dateString}</Today>
//   <InfoContainer>
//     <Info
//       placeholder="무슨 일이 있었나요? 생략해도 돼요."
//       darkmode={darkmode}
//     ></Info>
//     <ButtonContainer>
//       <Button darkmode={darkmode} onClick={() => setDarkmode(!darkmode)}>
//         <FontAwesomeIcon icon={faCircleHalfStroke} />
//       </Button>
//       <Button darkmode={darkmode} onClick={() => {}}>
//         <FontAwesomeIcon icon={faPaperPlane} />
//       </Button>
//     </ButtonContainer>
//   </InfoContainer>
// </Wrapper>

const Slider = styled.div`
  transform: ${({ fade }) =>
    fade ? `translateY(${-50}%)` : `translateY(${0}%)`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s;
`;

const SelectorContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: ${({ fade }) => (fade ? '340px' : '840px')};
  height: 460px;
  background-color: ${({ color, fade }) => (fade ? 'white' : color)};
  transition: background-color 0.3s, opacity 0.3s, width 0.3s;
  animation-timing-function: ease-in-out;
  overflow: hidden;
`;
