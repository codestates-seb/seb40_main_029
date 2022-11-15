import styled, { css } from 'styled-components';

const InputItem = styled.input`
  border: none;
  padding: 4px 8px;
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
`;
const Input = ({ placeHolder, value }) => {
  return <InputItem {...value} type="text" placeholder={placeHolder} />;
};

export default Input;
