import styled from 'styled-components';

export const ContentLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CenterLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const RightBottomLayout = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin: 8px;
`;
