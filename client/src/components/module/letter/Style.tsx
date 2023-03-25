import styled from 'styled-components';

export const ContentWrap = styled.div`
  overflow-y: scroll;
  height: 396px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
