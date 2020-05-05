import React, { Fragment } from 'react';
import T from 'prop-types';

import { HeaderWrap, UserNavBar } from '../base_ui';
import { ButtonsWrapper, Signin, SignUp, Browse } from './styledComponents';

const DesktopHeader = ({ activeUser, handleSignout, isSignedIn, isMobile }) => (
  <HeaderWrap isMobile={isMobile}>
    <ButtonsWrapper>
      <Browse label="Browse" path="/issues" />
      {isSignedIn ? (
        <UserNavBar activeUser={activeUser} handleSignout={handleSignout} />
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
  handleSignout: T.func,
  isSignedIn: T.bool,
  isMobile: T.bool,
};

export default DesktopHeader;
