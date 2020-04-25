import React, { Fragment } from 'react';
import Splash from '../../components/Splash';

export default function HomePage() {
  document.title = 'Rysolv';
  return (
    <Fragment>
      <Splash />
    </Fragment>
  );
}
