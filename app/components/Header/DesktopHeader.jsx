import React, { Fragment } from 'react';
import T from 'prop-types';

import { HeaderWrap, UserNavBar } from '../base_ui';
import { ButtonsWrapper, Signin, SignUp, Browse } from './styledComponents';

const DesktopHeader = ({
  activeUser,
  handleNav,
  handleSignout,
  isMobile,
  isSignedIn,
}) => (
  <HeaderWrap handleNav={handleNav} isMobile={isMobile}>
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
          <SignUp label="Sign Up" path="/signup" />
          <Signin label="Sign In" path="/signin" />
        </Fragment>
      )}
    </ButtonsWrapper>
  </HeaderWrap>
);

DesktopHeader.propTypes = {
  activeUser: T.object,
  handleNav: T.func,
  handleSignout: T.func,
  isMobile: T.bool,
  isSignedIn: T.bool,
};

export default DesktopHeader;
