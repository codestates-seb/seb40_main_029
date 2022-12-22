import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import SelectorCard from './SelectorCard';
import { paletteCodeSelector } from '../../redux/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modalSlice';
import { displayNameSelector } from '../../redux/hooks';
import modalSlice, { selectModal } from '../../redux/modalSlice';

const URL = `${process.env.REACT_APP_BASIC_URL}/`;
const p = 'palette/';
const m = 'mood/day/';
//displayName 필요

const MoodSelector = ({ lookbackRefresher, pointRefresher }) => {
  const dispatch = useDispatch();
  const paletteCode = useSelector(paletteCodeSelector);
  const displayName = useSelector(displayNameSelector);
  const { isOpen } = useSelector(selectModal);
  const [fade, setFade] = useState(true);
  const [theSubit, setTheSubmit] = useState(1);
  const submitHandler = () => {
    setTheSubmit(theSubit * -1);
  };
  // if (isOpen) {
  //   setFade(true);
  // }

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
    if (displayName === -1) {
      return;
    }
    axios.get(URL + m + displayName).then(res => {
      if (res.data === '') {
        return;
      }
      setReason(res.data.body);
      setMoodId(res.data.moodId);
      setIdx(Number(res.data.moodPaletteDetails.moodCode[3]) - 1);
      setFade(true);
    });
  }, [isOpen, displayName, theSubit]);

  const [idx, setIdx] = useState(0);
  const [darkmode, setDarkmode] = useState(false);
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
          setIdx={setIdx}
          toLeft={toLeft}
          toRight={toRight}
          setDarkmode={setDarkmode}
          setFade={setFade}
          fade={fade}
          paletteCode={paletteCode}
          reason={reason}
          setReason={setReason}
          setMoodId={setMoodId}
          moodId={moodId}
          moods={moods}
          submitHandler={submitHandler}
          lookbackRefresher={lookbackRefresher}
          pointRefresher={pointRefresher}
        />
        <CardContainer fade={fade}>
          <Mood
            color={palette[idx]}
            onClick={() => {
              !isOpen ? (setFade(false), handleCloseModal()) : null;
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
  transition: opacity 0.3s;
`;

const Mood = styled.div`
  width: 300px;
  height: 300px;
  margin: 10px 10px 0 10px;
  background-color: ${({ color }) => color};
`;

const Info = styled.div`
  width: 95%;
  margin: 10px 16px auto 16px;
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
  line-height: 22px;
  font-weight: 300;
  white-space: pre-line;
  overflow-y: scroll;
  transition: height 1s;
  animation-timing-function: ease-in-out;
  ::-webkit-scrollbar {
    display: none;
  }
`;
