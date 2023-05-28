import styled from 'styled-components';

export const Blueprint = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: white;
  border-radius: 20px;
  transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  animation: slideIn 0.5s;
  width: 100%;

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

export const Todo = styled(Blueprint)`
  height: 500px;
`;

export const Basic = styled(Blueprint)`
  height: 500px;
  position: relative;
`;

export const Store = styled(Blueprint)`
  width: 100%;
  height: 500px;
`;

export const Calendar = styled(Blueprint)`
  width: 100%;
  height: 600px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  height: 50px;
  border-bottom: 1px solid rgb(51, 52, 53);
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(51, 52, 53);
  line-height: 40px;
  font-size: 24px;
  font-weight: 600;
  margin: 8px 0 0 8px;
  > svg {
    margin-left: 16px;
    font-size: 20px;
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  padding: 8px 8px 0;
  cursor: pointer;
`;

export const Info = styled(Button)`
  opacity: 0.5;
  font-size: 15px;
  padding: 4px 4px 0;
  cursor: pointer;
`;

export const RealButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: 4px;
`;

export const Utility = styled.div`
  height: 100%;
  width: 100%;
`;
