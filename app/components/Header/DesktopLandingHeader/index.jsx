import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  ButtonWrapper,
  ComponentContainer,
  DesktopHeaderContainer,
  InternalLink,
  Logo,
  LogoWrapper,
  MessageLink,
  StyledPrimaryButton,
  StyledSecondaryButton,
  StyledUserNavBar,
  UnreadMessages,
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
  let navLinks;
  const isCompany = !!activeUser.company;
  const { unreadMessages } = activeUser;

  if (isSignedIn) {
    navLinks = (
      <Fragment>
        <InternalLink
          label="Dashboard"
          path={isCompany ? '/company/dashboard' : '/dashboard'}
        />
        <MessageLink label="Messages" path="/messages" />
        {!!unreadMessages && <UnreadMessages>{unreadMessages}</UnreadMessages>}
      </Fragment>
    );
  } else {
    navLinks = (
      <Fragment>
        <InternalLink label="Dashboard" path="/dashboard" />
      </Fragment>
    );
  }

  return (
    <ComponentContainer>
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
    </ComponentContainer>
  );
};

DesktopLandingHeader.propTypes = {
  activeUser: T.object.isRequired,
  handleNav: T.func.isRequired,
  handleSignout: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
};

export default DesktopLandingHeader;
