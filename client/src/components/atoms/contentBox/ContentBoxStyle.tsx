import styled, { css } from 'styled-components';

export const SIZES = {
  long: css`
    --contentBox-height: 100%;
  `,
};

export const Box = styled.div<{ sizeStyle: string }>`
  ${props => props.sizeStyle};
  margin: 16px;
  border-radius: 10px;
  padding: 16px 30px;
  height: var(--contentBox-height);
  background-color: #ffffff;
  filter: drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.25));
`;
