import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SelectorCard from './SelectorCard';
import { paletteCodeSelector } from '../../redux/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';
import { displayNameSelector } from '../../redux/hooks';

const URL = `${process.env.REACT_APP_BASIC_URL}/`;
const p = 'palette/';
const m = 'mood/day/';
//displayName 필요

const MoodSelector = ({ lookbackRefresher, pointRefresher }) => {
  const dispatch = useDispatch();
  const paletteCode = useSelector(paletteCodeSelector);
  const displayName = useSelector(displayNameSelector);

  const [palette, setPalette] = useState([]);

  const moods = [
    '기쁨',
    '슬픔',
    '분노',
    '설렘',
    '걱정',
    '평온',
    '예민',
    '희망',
  ];

  useEffect(() => {
    axios.get(URL + p + paletteCode).then(res => {
      const arr = [];
      for (const each of res.data) {
        arr.push('#' + each.colorCode);
      }
      setPalette(arr);
    });

    axios
      .get(URL + m + displayName) // displayName
      .then(res => {
        // console.log(res.data);
        setReason(res.data.body);
        setMoodId(res.data.moodId);
        setIdx(Number(res.data.moodPaletteDetails.moodCode[3]) - 1);
        setFade(true);
      })
      .catch(err => {
        console.log(err.response.status);
      });
  }, []);

  const [idx, setIdx] = useState(0);
  const [darkmode, setDarkmode] = useState(false);
  const [fade, setFade] = useState(false);
  const [reason, setReason] = useState('');
  const [moodId, setMoodId] = useState(false);

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

  const [viewDetails, setViewDetails] = useState(false);
  const handleViewDetails = () => {
    const selection = window.getSelection();
    if (selection.type != 'Range') {
      setViewDetails(!viewDetails);
    }
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  return (
    <SelectorContainer color={palette[idx]} fade={fade}>
      <Slider fade={fade}>
        <SelectorCard
          darkmode={darkmode}
          palette={palette}
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
          moods={moods}
          lookbackRefresher={lookbackRefresher}
          pointRefresher={pointRefresher}
        />
        {/* <MoodCard
          fade={fade}
          setFade={setFade}
          color={palette[idx]}
          id={moods[idx]}
          reason={reason}
        /> */}
        <CardContainer fade={fade}>
          <Mood
            color={palette[idx]}
            onClick={() => {
              setFade(false);
              handleCloseModal();
            }}
          />
          <Info>
            <Type>{moods[idx]}</Type>
            <Hexcode>{palette[idx]}</Hexcode>
            <Contents
              onClick={() => handleViewDetails()}
              viewDetails={viewDetails}
            >
              {reason}
            </Contents>
          </Info>
        </CardContainer>
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

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 320px;
  height: 430px;
  background-color: white;
  /* opacity: ${({ fade }) => (fade ? 1 : 0)}; */
  transition: opacity 0.3s;
`;

const Mood = styled.div`
  width: 300px;
  height: 300px;
  margin: 10px 10px 0 10px;
  background-color: ${({ color }) => color};
`;

const Info = styled.div`
  width: 100%;
  margin: 10px auto auto 16px;
  padding: 10px;
  text-align: left;
`;

const Type = styled.div`
  height: 40px;
  line-height: 40px;
  font-size: 36px;
  font-weight: 800;
`;

const Hexcode = styled.div`
  /* height: 36px; */
  font-size: 18px;
  font-weight: 300;
`;
const Contents = styled.div`
  height: ${({ viewDetails }) =>
    viewDetails ? '354px' : '44px'}; //460 - 94 - 10
  font-size: 18px;
  font-weight: 300;
  white-space: pre-line;
  overflow-y: scroll;
  transition: height 1s;
  animation-timing-function: ease-in-out;
  ::-webkit-scrollbar {
    display: none;
  }
`;
