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
  height: ${props => (props.viewDetails ? '354px' : '32px')}; //460 - 94 - 10
  font-size: 24px;
  font-weight: 300;
  overflow-y: scroll;
  transition: height 1s;
  animation-timing-function: ease-in-out;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MoodCard = () => {
  const hexcode = '#6868AC';
  const contents = `단지 피곤한 건지
  고민거리라도 있는지
  일이 힘들었는지
  그런 거라면 예쁘게
  기다릴 수 있는데
  깊은 맘 꺼내어 얘기하고 싶지만
  
  아닐 거야 내가 아는 너라면
  절대 이런 식은 아냐
  착각일 거야 오늘을 보내고
  기다리면 언제나처럼 넌`;

  const [viewDetails, setViewDetails] = useState(false);
  const handleViewDetails = () => {
    const selection = window.getSelection();
    if (selection.type != 'Range') {
      setViewDetails(!viewDetails);
    }
  };

  return (
    <CardContainer>
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
