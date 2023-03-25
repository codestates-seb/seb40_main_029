import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 340px;
  height: 460px;
  background-color: white;
  /* opacity: ${({ fade }) => (fade ? 1 : 0)}; */
  transition: opacity 0.3s;
  background-color: aliceblue;

  transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: slideIn 0.5s;

  @keyframes slideIn {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0%);
      opacity: 1;
    }
  }
`;

export const Mood = styled.div`
  width: 320px;
  height: 290px;
  margin: 10px 10px 0 10px;
  background-color: ${({ color }) => color};
`;

export const Info = styled.div`
  width: 100%;
  margin: 10px auto auto auto;
  padding: 10px;
  text-align: left;
`;

export const Type = styled.div`
  height: 40px;
  line-height: 40px;
  font-size: 40px;
  font-weight: 800;
`;

export const Hexcode = styled.div`
  height: 36px;
  font-size: 18px;
  font-weight: 300;
`;
export const Contents = styled.div`
  height: ${({ viewDetails }) =>
    viewDetails ? '354px' : '44px'}; //460 - 94 - 10
  font-size: 14px;
  font-weight: 300;
  white-space: pre-line;
  overflow-y: scroll;
  transition: height 1s;
  animation-timing-function: ease-in-out;
  ::-webkit-scrollbar {
    display: none;
  }
`;
