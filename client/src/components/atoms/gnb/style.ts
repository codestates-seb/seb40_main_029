import styled from 'styled-components';

export const NavItem = styled.li`
  list-style: none;
  padding: 4px 8px;
  margin: 2px 0;
  cursor: pointer;
  &:hover {
    background-color: #fff;
  }
`;
export const Label = styled.span`
  font-size: 14px;
`;
export const DarkIcon = styled.span`
  svg {
    width: 30px;
    padding-right: 10px;
    path {
      color: #656565;
    }
  }
`;
