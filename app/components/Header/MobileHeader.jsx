import React, { Fragment } from 'react';
import T from 'prop-types';

import Logo from './Logo';
import {
  BottomBarWrapper,
  Browse,
  ButtonsWrapper,
  Container,
  HeaderSection,
  LogoWrapper,
  MobileDrawerComponent,
  StyledAppBar,
  StyledHeaderLink,
  StyledHeaderSearchBar,
  StyledUserNavBar,
  TopBarWrapper,
} from './styledComponents';

const MobileHeader = ({
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
  <Fragment>
    <HeaderSection>
      <StyledAppBar
        color="default"
        isLandingPage={isLandingPage}
        position="relative"
      >
        <Container>
          <TopBarWrapper isSignedIn={isSignedIn}>
            <LogoWrapper>
              <Logo
                deviceView={deviceView}
                isMobile={isMobile}
                open={isDrawerOpen}
                setOpen={setIsDrawerOpen}
              />
            </LogoWrapper>
            <ButtonsWrapper>
              <Browse label="Browse" path="/issues" />
              {isSignedIn ? (
                <StyledUserNavBar
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
          </TopBarWrapper>
          <BottomBarWrapper>
            <StyledHeaderSearchBar handleNav={handleNav} />
          </BottomBarWrapper>
        </Container>
      </StyledAppBar>
    </HeaderSection>
    <MobileDrawerComponent
      handleNav={handleNav}
      isDrawerOpen={isDrawerOpen}
      isSignedIn={isSignedIn}
      setIsDrawerOpen={() => setIsDrawerOpen(!isDrawerOpen)}
    />
  </Fragment>
);

MobileHeader.propTypes = {
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

export default MobileHeader;
