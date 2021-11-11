import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  ButtonWrapper,
  DesktopHeaderContainer,
  InternalLink,
  Logo,
  LogoWrapper,
  StyledPrimaryButton,
  StyledSecondaryButton,
  StyledUserNavBar,
  VerticalDivider,
  Wordmark,
} from './styledComponents';

const SiteLogo = iconDictionary('siteLogo');
const SiteWordmark = iconDictionary('siteWordmark');

const DesktopLandingHeader = ({
  activeUser,
  handleNav,
  handleSignout,
  isSignedIn,
}) => {
  const { company } = activeUser;
  let navLinks;

  if (isSignedIn) {
    if (company) {
      navLinks = (
        <Fragment>
          <InternalLink label="Dashboard" path="/company/dashboard" />
          <InternalLink label="Messages" path="/messages" />
        </Fragment>
      );
    } else {
      navLinks = (
        <Fragment>
          <InternalLink label="Dashboard" path="/dashboard" />
          <InternalLink label="Messages" path="/messages" />
        </Fragment>
      );
    }
  } else {
    navLinks = (
      <Fragment>
        <InternalLink label="Hire engineers" path="/recruitment" />
      </Fragment>
    );
  }

  return (
    <DesktopHeaderContainer>
      <LogoWrapper onClick={() => handleNav('/')}>
        <Logo>{SiteLogo}</Logo>
        <Wordmark>{SiteWordmark}</Wordmark>
      </LogoWrapper>
      <ButtonWrapper>
        {navLinks}

        <VerticalDivider />
        {isSignedIn ? (
          <StyledUserNavBar
            activeUser={activeUser}
            handleNav={handleNav}
            handleSignout={handleSignout}
          />
        ) : (
          <Fragment>
            <StyledSecondaryButton
              label="Sign up"
              onClick={() => handleNav('/signup')}
            />
            <StyledPrimaryButton
              label="Log in"
              onClick={() => handleNav('/signin')}
            />
          </Fragment>
        )}
      </ButtonWrapper>
    </DesktopHeaderContainer>
  );
};

DesktopLandingHeader.propTypes = {
  activeUser: T.object.isRequired,
  handleNav: T.func.isRequired,
  handleSignout: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
};

export default DesktopLandingHeader;
