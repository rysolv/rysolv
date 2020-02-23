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
import Main from 'containers/Main/Loadable';

import GlobalStyles from '../../global-styles';

export function App() {
  return (
    <div>
      <Main />
      <GlobalStyles />
    </div>
  );
}

export default DragDropContext(HTML5Backend)(App);
