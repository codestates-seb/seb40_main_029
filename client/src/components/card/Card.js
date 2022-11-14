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
  margin: 10px;
  background-color: #6868ac;
`;

const Type = styled.div`
  line-height: 40px;
  font-size: 40px;
  font-weight: 800;
`;

const Info = styled.div`
  width: 100%;
  text-align: left;
`;

const Card = () => {
  return (
    <Container>
      <Mood />
      <Info>
        <Type>예민</Type>
      </Info>
    </Container>
  );
};

export default Card;
