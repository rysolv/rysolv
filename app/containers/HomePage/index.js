import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Splash from '../../components/Splash';

export default function HomePage() {
  document.title = 'Rysolv';
  return (
    <Fragment>
      <Splash />
      <ul>
        <li>
          <Link to="/issues">Issues</Link>
        </li>
        <li>
          <Link to="/organizations">Organizations</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </Fragment>
  );
}
