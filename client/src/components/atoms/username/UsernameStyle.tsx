import styled from 'styled-components';

export const Username = styled.span`
  margin-right: 16px; /* nav가 오픈되었을때 여부와 상관없이 위치고정 */
  font-size: 14px;
  cursor: pointer;
  svg {
    margin-right: 8px;
    path {
      color: ${({ color }) => (color ? `#${color}` : 'inherit')};
    }
  }
`;
