import { createGlobalStyle } from 'styled-components';
import { bodyColor, defaultFontSize } from './defaultStyleHelper';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    min-height: 100%;
    position: relative;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  a:hover {
    color: inherit;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: ${bodyColor};
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5em;
  }

  .noOptions {
    font-size: ${defaultFontSize};
  }
`;

export default GlobalStyle;
