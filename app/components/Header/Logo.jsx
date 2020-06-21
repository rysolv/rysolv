import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import { MobileNavIcon } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import { LinkTitle, StyledLink, StyledLogo } from './styledComponents';

const defaultSiteLogo = iconDictionary('siteLogo');

export const Logo = ({ deviceView, isMobile, open, setOpen }) => {
  const isMobileOrTablet = isMobile || deviceView === 'tablet';
  return (
    <StyledLink>
      {isMobileOrTablet ? (
        <MobileNavIcon open={open} setOpen={setOpen} />
      ) : (
        <StyledLogo>{defaultSiteLogo}</StyledLogo>
      )}
      <Link aria-label="Home Page" to="/">
        <LinkTitle isMobile={isMobileOrTablet}>RYSOLV</LinkTitle>
      </Link>
    </StyledLink>
  );
};

Logo.propTypes = {
  deviceView: T.string.isRequired,
  isMobile: T.bool.isRequired,
  open: T.bool,
  setOpen: T.func,
};

export default Logo;
