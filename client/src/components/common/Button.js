import styled, { css } from "styled-components";

const SIZES = {
  circle: css`
    --button-padding: 8px 12px;
    --button-radius: 50%;
  `,
  long: css`
    --button-padding: 8px 16px;
    --button-radius: 30px;
  `
};

function Button({ size, children }) {
  const sizeStyle = SIZES[size];

  return (
    <Btn
      sizeStyle={sizeStyle}
    >
      {children}
    </Btn>
  );
}

const Btn = styled.button`
  ${(props) => props.sizeStyle}

  padding: var(--button-padding);
  border-radius: var(--button-radius, 8px);
  background-color: #F6F6F6;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #FAF8FF;
  border: none;
  margin-right: 10px;

  &:active,
  &:hover,
  &:focus {
    box-shadow: inset 2px 2px 5px rgba(22, 27, 29, 0.25), inset -2px -2px 5px #FAF8FF;
  }
`;

export default Button;
