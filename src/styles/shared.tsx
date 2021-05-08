import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --grey: #D8D8D4;
    --grey-light: #FCFCFF;
    --grey-dark: #919191;
    --blue: #4693D9;
    --font-color: #282828;
  }

  html, body {
    * {
      box-sizing: border-box;
      outline: none;
      font-family: 'Roboto', sans-serif;
    }
  }
`
