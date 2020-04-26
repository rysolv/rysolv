/* eslint-disable no-restricted-globals */
import { createGlobalStyle } from 'styled-components';
import { mediaQueriesByDevice } from 'utils/breakpoints';
import { bodyColor } from './defaultStyleHelper';

// const { large } = mediaQueriesByDevice;
console.log(mediaQueriesByDevice);

// const maxWidth = screen.width;

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  html,
  body {
    height: 100%;
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
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: ${bodyColor};
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;

export default GlobalStyle;
