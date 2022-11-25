import { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 340px;
  height: 460px;
  background-color: white;
  /* opacity: ${({ fade }) => (fade ? 1 : 0)}; */
  transition: opacity 0.3s;
`;

const Mood = styled.div`
  width: 320px;
  height: 290px;
  margin: 10px 10px 0 10px;
  background-color: #6868ac;
`;

const Info = styled.div`
  width: 100%;
  margin: 10px auto auto auto;
  padding: 10px;
  text-align: left;
`;

const Type = styled.div`
  height: 40px;
  line-height: 40px;
  font-size: 40px;
  font-weight: 800;
`;

const Hexcode = styled.div`
  height: 36px;
  font-size: 24px;
  font-weight: 300;
`;
const Contents = styled.div`
  height: ${({ viewDetails }) =>
    viewDetails ? '354px' : '44px'}; //460 - 94 - 10
  font-size: 16px;
  font-weight: 300;
  white-space: pre-line;
  overflow-y: scroll;
  transition: height 1s;
  animation-timing-function: ease-in-out;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MoodCard = ({ fade }) => {
  const hexcode = '#6868AC';
  const contents =
    'black coffee 뇌가 저릿 위험한 향기 black coffee 한 잔 손에 쥔 도시의 좀비 쓰고 검은 커피는 이리 부드럽게 넘어가는데 쓰고 검은 내 밤은 오늘도 좀처럼 넘어가질 않고 버티네';

  const [viewDetails, setViewDetails] = useState(false);
  const handleViewDetails = () => {
    const selection = window.getSelection();
    if (selection.type != 'Range') {
      setViewDetails(!viewDetails);
    }
  };

  return (
    <CardContainer fade={fade}>
      <Mood />
      <Info>
        <Type>예민</Type>
        <Hexcode>{hexcode.slice(1)}</Hexcode>
        <Contents onClick={() => handleViewDetails()} viewDetails={viewDetails}>
          {contents}
        </Contents>
      </Info>
    </CardContainer>
  );
};

export default MoodCard;
