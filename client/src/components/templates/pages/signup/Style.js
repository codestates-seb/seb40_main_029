import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const InputContainer = styled.div`
  margin-right: 10%;
`;

export const InputHeader = styled.h3`
  margin-left: 5px;
`;

export const Button = styled.button`
  margin-left: 10px;
  padding: 5px 15px;
  height: 28px;
  border-radius: 30px;
  font-size: 14px;
  background-color: inherit;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  border: none;

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

export const Warning = styled.h5`
  margin-left: 5px;
  font-weight: 200;
  color: red;
`;

export const LogoContainer = styled.div`
  margin: 10px;
`;
