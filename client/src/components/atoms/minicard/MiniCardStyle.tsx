import styled from 'styled-components';

export const Card = styled.div`
  width: 100px;
  height: 120px;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  margin: 16px;
  position: relative;
  background-color: #ffffff;
`;
export const MoodPic = styled.div`
  width: 100px;
  height: 90px;
  border: 4px solid white;
  background-color: ${props => (props.color ? `#${props.color}` : '#faf8ff')};
`;
export const Contents = styled.span`
  margin-left: 4px;
  font-size: 13px;
`;
export const Mood = styled(Contents)`
  position: absolute;
  bottom: 34px;
  right: 8px;
  font-weight: 700;
  color: #ffffff;
`;
