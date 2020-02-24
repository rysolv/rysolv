/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

// MUI Theme Imports
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

export function App() {
  return (
    <StylesProvider generateClassName={generateClassName} jss={jss}>
      <div>
        <ViewSize>
          <Main />
          <GlobalStyles />
        </ViewSize>
      </div>
    </StylesProvider>
  );
}

export default DragDropContext(HTML5Backend)(App);
