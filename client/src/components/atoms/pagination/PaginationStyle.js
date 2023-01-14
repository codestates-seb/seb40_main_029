import styled from 'styled-components';

export const Pages = styled.nav`
  position: absolute;
  bottom: 0;
  margin-bottom: 16px;
`;

export const Page = styled.button`
  border: none;
  padding: 4px;
  margin: 2px;
  background-color: inherit;

  border-radius: 5px;
  &:hover {
    background-color: #f4f4f4;
  }
  &.active {
    background-color: #e3e3e3;
  }
`;
