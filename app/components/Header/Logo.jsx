import React from 'react';
import T from 'prop-types';

import { MobileNavIcon } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import { LinkTitle, StyledLink, StyledLogo } from './styledComponents';

const defaultSiteLogo = iconDictionary('siteLogo');

export const Logo = ({ isMobile }) => (
  <StyledLink aria-label="Home Page" to="/">
    {isMobile ? <MobileNavIcon /> : <StyledLogo>{defaultSiteLogo}</StyledLogo>}
    <LinkTitle isMobile={isMobile}>RYSOLV</LinkTitle>
  </StyledLink>
);

Logo.propTypes = { isMobile: T.bool.isRequired };

export default Logo;
