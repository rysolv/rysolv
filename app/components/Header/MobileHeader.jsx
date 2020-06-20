import React, { Fragment } from 'react';
import T from 'prop-types';
import AppBar from '@material-ui/core/AppBar';

import Logo from './Logo';
import {
  BottomBarWrapper,
  Browse,
  ButtonsWrapper,
  Container,
  HeaderSection,
  LogoWrapper,
  StyledHeaderLink,
  StyledHeaderSearchBar,
  StyledUserNavBar,
  TopBarWrapper,
} from './styledComponents';

const MobileHeader = ({
  activeUser,
  handleNav,
  handleSignout,
  isMobile,
  isSignedIn,
}) => (
  <HeaderSection>
    <AppBar color="default">
      <Container>
        <TopBarWrapper isSignedIn={isSignedIn}>
          <LogoWrapper>
            <Logo isMobile={isMobile} />
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
    </AppBar>
  </HeaderSection>
);

MobileHeader.propTypes = {
  activeUser: T.object,
  handleNav: T.func,
  handleSignout: T.func,
  isMobile: T.bool,
  isSignedIn: T.bool,
};

export default MobileHeader;
