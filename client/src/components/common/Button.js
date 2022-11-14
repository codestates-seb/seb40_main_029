import styled, { css } from 'styled-components';

const SIZES = {
  circle: css`
    --button-padding: 10px;
    --button-radius: 50%;
    --button-width: 38px;
    --button-height: 38.39px;
  `,
  long: css`
    --button-padding: 10px 16px;
    --button-radius: 30px;
  `,
};

function Button({ size, children }) {
  const sizeStyle = SIZES[size];

  return <Btn sizeStyle={sizeStyle}>{children}</Btn>;
}

const Btn = styled.button`
  ${props => props.sizeStyle}

  padding: var(--button-padding);
  border-radius: var(--button-radius, 8px);
  background-color: #f6f6f6;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  width: var(--button-width);
  /* height: var(--button-height); */
  border: none;
  margin-right: 10px;
  font-weight: 700;

  &:active,
  &:hover,
  &:focus {
    box-shadow: inset 2px 2px 5px rgba(22, 27, 29, 0.25),
      inset -2px -2px 5px #faf8ff;
  }
`;

export default Button;
