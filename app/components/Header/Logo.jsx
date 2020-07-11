import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

import { MobileNavIcon } from 'components/base_ui';

import { LinkTitle, StyledLink } from './styledComponents';

export const Logo = ({ deviceView, isMobile, open, setOpen }) => {
  const isMobileOrTablet = isMobile || deviceView === 'tablet';
  return (
    <StyledLink>
      {isMobileOrTablet ? (
        <MobileNavIcon open={open} setOpen={setOpen} />
      ) : null}
      <Link aria-label="Home Page" to="/">
        <LinkTitle isMobile={isMobileOrTablet}>rysolv</LinkTitle>
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
