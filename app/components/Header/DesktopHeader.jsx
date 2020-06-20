import React, { Fragment } from 'react';
import T from 'prop-types';
import AppBar from '@material-ui/core/AppBar';

import { HeaderSearchBar, UserNavBar } from 'components/base_ui';

import Logo from './Logo';
import {
  Browse,
  ButtonsWrapper,
  Container,
  HeaderSection,
  LogoWrapper,
  StyledHeaderLink,
} from './styledComponents';

const DesktopHeader = ({
  activeUser,
  handleNav,
  handleSignout,
  isMobile,
  isSignedIn,
}) => (
  <HeaderSection>
    <AppBar color="default">
      <Container>
        <LogoWrapper>
          <Logo isMobile={isMobile} />
          <HeaderSearchBar handleNav={handleNav} />
        </LogoWrapper>
        <ButtonsWrapper>
          <Browse label="Browse" path="/issues" />
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
    </AppBar>
  </HeaderSection>
);

DesktopHeader.propTypes = {
  activeUser: T.object,
  handleNav: T.func,
  handleSignout: T.func,
  isMobile: T.bool,
  isSignedIn: T.bool,
};

export default DesktopHeader;
