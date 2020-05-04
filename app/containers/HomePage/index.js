import React, { Fragment } from 'react';
import Splash from 'components/Splash';
import Landing from 'components/Landing';

export default function HomePage() {
  document.title = 'Rysolv';
  return (
    <Fragment>
      <Splash />
      <Landing />
    </Fragment>
  );
}
