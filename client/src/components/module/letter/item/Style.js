import styled from 'styled-components';

export const LetterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
`;
export const LetterBody = styled.div`
  margin: 16px 0;
`;
export const DeleteBtn = styled.span`
  font-size: 13px;
  opacity: 0.5;
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;
export const Alarm = styled.span`
  padding: 0 8px;
`;
export const DetailDate = styled.span`
  font-size: 13px;
  opacity: 0.5;
`;
