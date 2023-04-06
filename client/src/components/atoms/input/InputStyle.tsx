import styled from 'styled-components';

export const InputItem = styled.input`
  border: none;
  padding: 4px 8px;
  border-radius: 10px;
  margin-bottom: 16px;
  box-shadow: none;
  /* box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff; */
  margin: 8px 0;
  background-color: ${props => (props.color ? props.color : 'white')};
`;
