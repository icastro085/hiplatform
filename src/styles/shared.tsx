import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');

  html, body {
    * {
      box-sizing: border-box;
      outline: none;
      font-family: 'Roboto', sans-serif;
    }
  }
`
