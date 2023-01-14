import styled from 'styled-components';

export const PopUp = styled.div`
  z-index: 2;
  button {
    margin-right: -10px;
  }
`;
export const Title = styled.h3`
  border-bottom: 1px solid #d4d4d4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  div {
    display: flex;
  }
`;
export const InputWraper = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  label {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 8px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
  }
  input {
    padding: 8px;
    width: 200px;
    border-radius: 20px;
  }
  button {
    width: 100px;
  }
`;
export const Validation = styled.p`
  font-size: 13px;
  color: tomato;
  text-align: end;
  padding-right: 16px;
  margin-top: -8px;
  margin-bottom: 8px;
`;
