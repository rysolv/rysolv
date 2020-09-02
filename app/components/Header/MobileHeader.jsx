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
  handleResetForm,
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
        position="fixed"
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
                  <StyledHeaderLink
                    label="Sign Up"
                    onClick={handleResetForm}
                    path="/signup"
                  />
                  <StyledHeaderLink
                    label="Sign In"
                    onClick={handleResetForm}
                    path="/signin"
                  />
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
  activeUser: T.object.isRequired,
  deviceView: T.string.isRequired,
  handleNav: T.func.isRequired,
  handleResetForm: T.func.isRequired,
  handleSignout: T.func.isRequired,
  isDrawerOpen: T.bool.isRequired,
  isLandingPage: T.bool.isRequired,
  isMobile: T.bool.isRequired,
  isSignedIn: T.bool.isRequired,
  setIsDrawerOpen: T.func.isRequired,
};

export default MobileHeader;
