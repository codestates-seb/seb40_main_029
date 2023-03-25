import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
`;
export const HeaderTitle = styled.h1`
  line-height: 1.2;
  letter-spacing: 2px;
  font-size: 40px;
  margin: 0;
  margin-left: 16px;
`;
export const BookmarkWrapper = styled.div`
  margin-top: 4px;
  margin-left: 16px;
  display: flex;
`;
export const GnbLayout = styled.div`
  position: absolute;
  right: 0;
  min-width: 120px;
`;
export const Contain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LoginBtnContain = styled.div`
  z-index: 5;
`;
export const Point = styled.span`
  margin-right: 16px;
  font-size: 14px;
  > svg {
    margin-right: 8px;
  }
  path {
    color: #fcc403;
  }
  &:after {
    content: 'P';
    margin-left: 2px;
  }
`;
