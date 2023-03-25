import styled from 'styled-components';

export const FriendCardWrap = styled.div`
  position: relative;
  &:hover > span {
    display: inline-block;
  }
`;
export const EditBtn = styled.span`
  position: absolute;
  right: 16px;
  bottom: 24px;
  display: none;
  &:hover {
    opacity: 0.7;
  }
`;
