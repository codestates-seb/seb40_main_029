import styled from 'styled-components';

export const PopUp = styled.div`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  button {
    margin-right: -10px;
  }
`;
export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  align-items: center;
  div {
    display: flex;
  }
`;
export const LetterBox = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  min-width: 300px;
  div {
    font-weight: 700;
    margin: 0 16px;
    display: flex;
    align-items: center;
  }
  label {
    padding: 0 8px;
  }
  > label {
    display: none;
  }
`;
export const Selector = styled.select`
  padding: 8px;
  border: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  width: 50%;
  background-color: #fafafa;
`;
export const Option = styled.option`
  padding-left: 16px; //안먹음!
`;
export const Textarea = styled.textarea`
  border: none;
  height: 200px;
  padding: 8px;
  margin: 16px;
  background-color: #fafafa;
  border-radius: 20px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
`;
