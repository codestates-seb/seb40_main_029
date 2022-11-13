import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import './fonts/pretendard-subset.css';

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  // You can continue writing global styles here
  * {
    font-family: 'Pretendard';
    box-sizing: border-box;
    text-decoration: none;
    padding: 0;
    margin: 0;
    /* border-radius: ; */
    line-height: 1.5;

  }
  body {
    background-color: #F1F2F3;
  }
  a, button {
    cursor: pointer;
  }

`;