import React, { Fragment } from 'react';
import T from 'prop-types';

import Logo from './Logo';
import {
  ButtonsWrapper,
  Container,
  LogoWrapper,
  MobileDrawerComponent,
  NavLink,
  StyledAppBar,
  StyledHeaderLink,
  StyledHeaderSearchBar,
  StyledUserNavBar,
  TopBarWrapper,
  UnreadMessages,
} from './styledComponents';

const MobileHeader = ({
  activeUser,
  deviceView,
  handleNav,
  handleResetState,
  handleSignout,
  isDrawerOpen,
  isLandingOrRecruitmentPage,
  isMobile,
  isSignedIn,
  location,
  setIsDrawerOpen,
}) => {
  const isCompany = !!activeUser.company;
  const { unreadMessages } = activeUser;

  return (
    <Fragment>
      <StyledAppBar
        color="default"
        isLandingOrRecruitmentPage={isLandingOrRecruitmentPage}
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
              <NavLink
                label="Dashboard"
                path={isCompany ? '/company/dashboard' : '/dashboard'}
                shouldRemoveThird
              />
              <NavLink label="Jobs" path="/jobs" shouldRemoveSecond />
              <NavLink label="Messages" path="/messages" />
              {!!unreadMessages && (
                <UnreadMessages>{unreadMessages}</UnreadMessages>
              )}
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
          </TopBarWrapper>
          <StyledHeaderSearchBar handleNav={handleNav} />
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
};

MobileHeader.propTypes = {
  activeUser: T.object.isRequired,
  deviceView: T.string.isRequired,
  handleNav: T.func.isRequired,
  handleResetState: T.func.isRequired,
  handleSignout: T.func.isRequired,
  isDrawerOpen: T.bool.isRequired,
  isLandingOrRecruitmentPage: T.bool.isRequired,
  isMobile: T.bool.isRequired,
  isSignedIn: T.bool.isRequired,
  location: T.object.isRequired,
  setIsDrawerOpen: T.func.isRequired,
};

export default MobileHeader;
