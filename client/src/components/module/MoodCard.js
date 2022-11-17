import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
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
  const contents = '머리가 아프다 ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ';

  const [viewDetails, setViewDetails] = useState(false);
  const handleViewDetails = () => {
    const selection = window.getSelection();
    if (selection.type != 'Range') {
      setViewDetails(!viewDetails);
    }
  };

  return (
    <Container>
      <Mood />
      <Info>
        <Type>예민</Type>
        <Hexcode>{hexcode.slice(1)}</Hexcode>
        <Contents onClick={() => handleViewDetails()} viewDetails={viewDetails}>
          {contents}
        </Contents>
      </Info>
    </Container>
  );
};

export default MoodCard;
