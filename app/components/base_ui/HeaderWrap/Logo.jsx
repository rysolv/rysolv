import React from 'react';
import { Link } from 'react-router-dom';

import iconDictionary from 'utils/iconDictionary';

import { StyledLink } from './styledComponents';

const defaultSiteLogo = iconDictionary('siteLogo');

export const Logo = () => (
  <StyledLink>
    <Link aria-label="Home Page" to="/">
      {defaultSiteLogo} RYSOLV
    </Link>
  </StyledLink>
);

export default Logo;
