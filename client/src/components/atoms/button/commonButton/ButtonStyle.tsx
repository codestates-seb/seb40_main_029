import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
export const SIZES = {
  circle: css`
    --button-padding: 10px;
    --button-radius: 50%;
    --button-width: 38px;
    --button-height: 38.39px;
  `,
  long: css`
    --button-padding: 10px 16px;
    --button-radius: 30px;
    --button-max-width: 100px;
  `,
};

export const FONTSIZES = {
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

interface ButtonStyleProps {
  sizeStyle?: FlattenSimpleInterpolation;
  fontSizeStyle?: FlattenSimpleInterpolation;
}

export const Button = styled.button<ButtonStyleProps>`
  ${props => props.sizeStyle}
  ${props => props.fontSizeStyle}

  padding: var(--button-padding);
  border-radius: var(--button-radius, 8px);
  background-color: inherit;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  width: var(--button-width);
  max-width: var(--button-max-width);
  height: var(--button-height);
  border: none;
  margin-right: 10px;
  font-size: var(--button-font-size);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover,
  &:active {
    &:not([disabled]) {
      box-shadow: inset 2px 2px 5px rgba(22, 27, 29, 0.25),
        inset -2px -2px 5px #faf8ff;
    }
  }

  &[disabled] {
    cursor: default;
    opacity: 0.5;
    background: #dc3545 #025ce2;
  }
`;
