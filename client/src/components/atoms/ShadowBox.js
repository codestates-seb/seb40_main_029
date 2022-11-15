import styled, { css } from 'styled-components';

const SIZES = {
  long: css`
    --shadowBox-height: 100%;
  `,
};
const Box = styled.div`
  ${props => props.sizeStyle};
  margin: 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  padding: 16px 30px;
  height: var(--shadowBox-height);
`;

const ShadowBox = ({ children, onClick, size }) => {
  const sizeStyle = SIZES[size];
  return (
    <>
      <Box onClick={onClick} sizeStyle={sizeStyle}>
        {children}
      </Box>
    </>
  );
};

export default ShadowBox;
