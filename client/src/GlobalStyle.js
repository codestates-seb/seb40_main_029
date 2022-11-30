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
    color: #333435;

  }
  body {
    background-color: #F6F6F6;
    /* background-color: gray */
    background-color: #F6F6F6;
    /* background-color: black */
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  a, button {
    cursor: pointer;
  }

`;
