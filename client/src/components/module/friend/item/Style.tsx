import styled from 'styled-components';

export const Item = styled.label`
  display: block;
  border-bottom: 1px solid #ededed;
  input {
    display: none;
  }
  input + span {
    display: block;
    padding: 4px 0;
    padding-left: 16px;
  }
  input:checked + span {
    background-color: #f6f6f6;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
      inset 3px 3px 5px rgba(0, 0, 0, 0.25);
  }
`;
