import React, { Fragment } from 'react';
import T from 'prop-types';

import { HeaderSearchBar, UserNavBar } from 'components/base_ui';
import UserActivityButton from 'components/UserActivityButton';

import Logo from './Logo';
import {
  Browse,
  ButtonsWrapper,
  Container,
  HeaderSection,
  LogoWrapper,
  MobileDrawerComponent,
  StyledAppBar,
  StyledHeaderLink,
} from './styledComponents';

const DesktopHeader = ({
  activeUser,
  deviceView,
  handleNav,
  handleSignout,
  isDrawerOpen,
  isLandingPage,
  isMobile,
  isSignedIn,
  setIsDrawerOpen,
}) => (
  <HeaderSection>
    <StyledAppBar
      color="default"
      isLandingPage={isLandingPage}
      position="relative"
    >
      <Container>
        <LogoWrapper>
          <Logo
            deviceView={deviceView}
            isMobile={isMobile}
            open={isDrawerOpen}
            setOpen={setIsDrawerOpen}
          />
          <HeaderSearchBar handleNav={handleNav} />
        </LogoWrapper>
        <ButtonsWrapper>
          <Browse label="Browse" path="/issues" />
          <UserActivityButton handleNav={handleNav} />

          {isSignedIn ? (
            <UserNavBar
              activeUser={activeUser}
              handleNav={handleNav}
              handleSignout={handleSignout}
            />
          ) : (
            <Fragment>
              <StyledHeaderLink label="Sign Up" path="/signup" />
              <StyledHeaderLink label="Sign In" path="/signin" />
            </Fragment>
          )}
        </ButtonsWrapper>
      </Container>
    </StyledAppBar>
    <MobileDrawerComponent
      handleNav={handleNav}
      isDrawerOpen={isDrawerOpen}
      isSignedIn={isSignedIn}
      setIsDrawerOpen={() => setIsDrawerOpen(!isDrawerOpen)}
    />
  </HeaderSection>
);

DesktopHeader.propTypes = {
  activeUser: T.object,
  deviceView: T.string,
  handleNav: T.func,
  handleSignout: T.func,
  isDrawerOpen: T.bool,
  isLandingPage: T.bool.isRequired,
  isMobile: T.bool,
  isSignedIn: T.bool,
  setIsDrawerOpen: T.func,
};

export default DesktopHeader;
