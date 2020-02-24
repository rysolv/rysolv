import React from 'react';
import { Link } from 'react-router-dom';
import iconDictionary from 'utils/iconDictionary';

const defaultSiteLogo = iconDictionary('siteLogo', null, 'logo');

export const Logo = () => (
  <Link aria-label="Home Page" to="/">
    {defaultSiteLogo}
  </Link>
);

export default Logo;
