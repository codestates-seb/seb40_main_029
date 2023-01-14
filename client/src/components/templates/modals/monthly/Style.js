import styled from 'styled-components';

export const Contain = styled.div`
  position: relative;
  z-index: 50;
  width: 100%;
  height: 100%;
`;

export const MonthlyColor = styled.h1`
  position: fixed;
  top: 0px;
  left: 50px;
  opacity: 0.2;
  font-size: 40px;
  letter-spacing: 0.7rem;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  opacity: 0.3;
  padding: 0 7px;
`;

export const Info = styled(Button)`
  position: fixed;
  font-size: 17px;
  top: 57px;
  left: 310px;
  cursor: pointer;
`;

export const ButtonContain = styled.span`
  position: fixed;
  top: 30px;
  right: 30px;
  cursor: pointer;
  opacity: 0.4;
`;
