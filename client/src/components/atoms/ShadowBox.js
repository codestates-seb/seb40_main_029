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
  padding: 16px 30px;
  height: var(--shadowBox-height);
  background-color: #ffffff;
  filter: drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.25));
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
