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

const FONTSIZES = {
  little: css`
    --button-font-size: 11px;
  `,
  middle: css`
    --button-font-size: 14px;
  `,
  large: css`
    --button-font-size: 18px;
  `,
};

function Button({ size, fontsize, children, onClick }) {
  const sizeStyle = SIZES[size];
  const fontSizeStyle = FONTSIZES[fontsize];

  return (
    <Btn sizeStyle={sizeStyle} fontSizeStyle={fontSizeStyle} onClick={onClick}>
      {children}
    </Btn>
  );
}

const Btn = styled.button`
  ${props => props.sizeStyle}
  ${props => props.fontSizeStyle}

  padding: var(--button-padding);
  border-radius: var(--button-radius, 8px);
  background-color: inherit;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  width: var(--button-width);
  height: var(--button-height);
  border: none;
  margin-right: 10px;
  /* font-weight: 700; */
  font-size: var(--button-font-size);

  &:hover {
    box-shadow: inset 2px 2px 5px rgba(22, 27, 29, 0.25),
      inset -2px -2px 5px #faf8ff;
  }
`;

export default Button;
