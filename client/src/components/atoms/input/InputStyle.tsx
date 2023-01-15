import styled, { css } from 'styled-components';

export const SIZES = {
  long: css`
    --input-height: 200px;
  `,
};

export const BORDER = {
  shadow: css`
    --input-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  `,
  transparent: css`
    --input-shadow: none;
  `,
};

interface InputStyleProps {
  sizeStyle: string;
  borderStyle: string;
}

export const InputItem = styled.input<InputStyleProps>`
  ${props => props.sizeStyle};
  ${props => props.borderStyle};
  height: var(--input-height);
  border: none;
  padding: 4px 8px;
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: var(--input-shadow);
  margin: 8px 0;
  background-color: ${props => (props.color ? props.color : 'white')};
`;
