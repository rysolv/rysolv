import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// AWS Amplify
import Amplify from '@aws-amplify/core';

// MUI Theme Imports
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import {
  createGenerateClassName,
  jssPreset,
  StylesProvider,
} from '@material-ui/styles';

import Main from 'containers/Main/Loadable';
import ViewSize from 'containers/ViewSize';
import GlobalStyles from '../../global-styles';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById('jss-insertion-point'),
});

// MUI Theme
const muiTheme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: { '&:hover:not($disabled):before': { borderBottom: 'none' } },
    },
  },
  palette: {
    accent3Color: 'green',
    primary1Color: 'green',
  },
});

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_APP_CLIENT_ID,
  },
});

export function App() {
  return (
    <StylesProvider generateClassName={generateClassName} jss={jss}>
      <MuiThemeProvider theme={muiTheme}>
        <ViewSize>
          <Main />
          <GlobalStyles />
        </ViewSize>
      </MuiThemeProvider>
    </StylesProvider>
  );
}

export default DragDropContext(HTML5Backend)(App);
