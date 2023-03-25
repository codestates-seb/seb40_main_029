import styled from 'styled-components';

export const BookItem = styled.div`
  position: relative;
  &:hover > span {
    display: inline-block;
  }
`;
export const Anchor = styled.a`
  line-height: 1;
  padding: 8px 0;
`;
export const EditBtn = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  padding: 2px 8px 2px 0;
  font-size: 12px;
  display: none;

  &:hover {
    opacity: 0.7;
  }
`;
