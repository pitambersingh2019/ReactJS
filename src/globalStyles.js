import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'ProximaNova';
  }

  html{
    font-size: 10px;
    font-family: 'ProximaNova';
   
  }

  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }


`;

export default GlobalStyle;
