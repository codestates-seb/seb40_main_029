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
  div {
    display: flex;
  }
`;
export const FilterBox = styled.div`
  display: flex;
  align-items: center;
  margin: 16px auto 24px;
  min-width: 360px;
  justify-content: space-around;
`;
export const InputBox = styled.div`
  position: relative;
  input {
    padding: 8px;
    border-radius: 20px;
    width: 240px;
  }
  svg {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    right: 0;
    line-height: 1;
  }
`;
export const FriendListBox = styled.div`
  list-style: none;
  border: 1px solid #ededed;
  border-radius: 10px;
  height: 150px;
  overflow-y: scroll;
  margin-bottom: 18px;
`;
