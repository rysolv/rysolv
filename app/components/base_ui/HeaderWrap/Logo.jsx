import React from 'react';
import { Link } from 'react-router-dom';
import iconDictionary from 'utils/iconDictionary';

const defaultSiteLogo = iconDictionary('siteLogo');

export const Logo = () => (
  <Link aria-label="Home Page" to="/">
    {defaultSiteLogo} RYSOLV
  </Link>
);

export default Logo;
