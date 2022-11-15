import styled from 'styled-components';

const Box = styled.div`
  margin: 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  padding: 16px 30px;
`;

const ShadowBox = ({ children, onClick }) => {
  return (
    <>
      <Box onClick={onClick}>{children}</Box>
    </>
  );
};

export default ShadowBox;
