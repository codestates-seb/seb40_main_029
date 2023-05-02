import styled from 'styled-components';
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
