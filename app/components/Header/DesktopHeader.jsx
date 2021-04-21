import React, { Fragment } from 'react';
import T from 'prop-types';

import { HeaderSearchBar, UserNavBar } from 'components/base_ui';

import AboutDropdown from './AboutDropdown';
import Logo from './Logo';
import {
  ButtonsWrapper,
  Container,
  LogoWrapper,
  MobileDrawerComponent,
  NavLink,
  StyledAppBar,
  StyledHeaderLink,
} from './styledComponents';
import UserActivityDropdown from './UserActivityDropdown';

const DesktopHeader = ({
  activeUser,
  deviceView,
  handleNav,
  handleResetState,
  handleSignout,
  isDrawerOpen,
  isLandingPage,
  isMobile,
  isSignedIn,
  location,
  setIsDrawerOpen,
}) => (
  <Fragment>
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
          <AboutDropdown handleNav={handleNav} />
          <NavLink label="Get Hired" path="/jobs" shouldRemoveFirst />
          <NavLink label="Find Issues" path="/issues" />
          <UserActivityDropdown handleNav={handleNav} />

          {isSignedIn ? (
            <UserNavBar
              activeUser={activeUser}
              handleNav={handleNav}
              handleSignout={handleSignout}
            />
          ) : (
            <Fragment>
              <StyledHeaderLink
                label="Sign Up"
                onClick={handleResetState}
                path="/signup"
              />
              <StyledHeaderLink
                label="Sign In"
                onClick={handleResetState}
                path="/signin"
              />
            </Fragment>
          )}
        </ButtonsWrapper>
      </Container>
    </StyledAppBar>
    <MobileDrawerComponent
      handleNav={handleNav}
      isDrawerOpen={isDrawerOpen}
      isSignedIn={isSignedIn}
      location={location}
      setIsDrawerOpen={() => setIsDrawerOpen(!isDrawerOpen)}
    />
  </Fragment>
);

DesktopHeader.propTypes = {
  activeUser: T.object.isRequired,
  deviceView: T.string.isRequired,
  handleNav: T.func.isRequired,
  handleResetState: T.func.isRequired,
  handleSignout: T.func.isRequired,
  isDrawerOpen: T.bool.isRequired,
  isLandingPage: T.bool.isRequired,
  isMobile: T.bool.isRequired,
  isSignedIn: T.bool.isRequired,
  location: T.object.isRequired,
  setIsDrawerOpen: T.func.isRequired,
};

export default DesktopHeader;
