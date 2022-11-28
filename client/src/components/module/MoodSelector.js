import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import MoodCard from './MoodCard';
import SelectorCard from './SelectorCard';
import { paletteCodeSelector } from '../../redux/hooks';
import { useSelector } from 'react-redux';

const URL2 = 'http://ec2-15-165-76-0.ap-northeast-2.compute.amazonaws.com:8080';

const MoodSelector = () => {
  const paletteCode = useSelector(paletteCodeSelector);

  const [palette, setPalette] = useState([]);
  const [fade, setFade] = useState(false);
  const [reason, setReason] = useState('');

  const [moodId, setMoodId] = useState(false);

  useEffect(() => {
    axios
      .get(URL2 + '/mood/day/회원1')
      .then(res => {
        console.log(res.data);
        setFade(true);
        setReason(res.data.body);
        setMoodId(res.data.moodId);
        setIdx(res.data.moodPaletteDetails.moodPaletteDetailsId - 1);
      })
      .catch(err => console.log(err.response.status));

    axios.get(URL2 + '/palette/' + paletteCode).then(res => {
      const arr = [];

      for (const each of res.data) {
        arr.push(['#' + each.colorCode, each.mood]);
      }
      setPalette(arr);
    });
  }, []);

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
    <SelectorContainer
      color={palette.length !== 0 ? palette[idx][0] : null}
      fade={fade}
    >
      <Slider fade={fade}>
        <SelectorCard
          darkmode={darkmode}
          palette={palette.length !== 0 ? palette : null}
          idx={idx}
          toLeft={toLeft}
          toRight={toRight}
          setDarkmode={setDarkmode}
          setFade={setFade}
          fade={fade}
          paletteCode={paletteCode}
          reason={reason}
          setReason={setReason}
          moodId={moodId}
        />
        <MoodCard
          fade={fade}
          setFade={setFade}
          color={palette.length !== 0 ? palette[idx][0] : null}
          id={palette.length !== 0 ? palette[idx][1] : null}
          reason={reason}
        />
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
  background-color: ${({ color, fade }) => (fade ? '#f6f6f6' : color)};
  transition: background-color 0.3s, opacity 0.3s, width 0.3s;
  animation-timing-function: ease-in-out;
  overflow: hidden;
`;
