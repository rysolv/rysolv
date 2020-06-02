import React from 'react';
import { Link } from 'react-router-dom';

import { LandingWrapper } from './styledComponents';

const Landing = () => (
  <LandingWrapper>
    Welcome to rysolv!
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
  </LandingWrapper>
);

export default Landing;
