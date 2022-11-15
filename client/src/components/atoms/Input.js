import styled, { css } from 'styled-components';

const SIZES = {
  long: css`
    --input-height: 200px;
  `,
};

const InputItem = styled.input`
  ${props => props.sizeStyle}
  height: var(--input-height);
  border: none;
  padding: 4px 8px;
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  margin: 8px 0;
`;

const Input = ({ placeHolder, value, size }) => {
  const sizeStyle = SIZES[size];
  return (
    <InputItem
      sizeStyle={sizeStyle}
      {...value}
      type="text"
      placeholder={placeHolder}
    />
  );
};

export default Input;
