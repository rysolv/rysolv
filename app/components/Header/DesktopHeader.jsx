import React from 'react';
import T from 'prop-types';

import { HeaderWrap, UserNavBar } from '../base_ui';
import { ButtonsWrapper, Login, SignUp, Test } from './styledComponents';

const DesktopHeader = ({ activeUser, isMobile, handleLogin, handleLogout }) => (
  <HeaderWrap isMobile={isMobile}>
    <ButtonsWrapper>
      <Login label="Log In" path="/login" />
      <SignUp label="Sign Up" path="/signup" />
      <Test label="Test" path="/test" />
      <button
        type="button"
        onClick={() =>
          handleLogin({ userId: 'b519b064-b5db-4472-ad1b-00e30bdbfa4c' })
        }
      >
        Login!
      </button>
      <button
        type="button"
        onClick={() =>
          handleLogout({ userId: 'b519b064-b5db-4472-ad1b-00e30bdbfa4c' })
        }
      >
        Logout!
      </button>
      <UserNavBar activeUser={activeUser} />
    </ButtonsWrapper>
  </HeaderWrap>
);

DesktopHeader.propTypes = {
  activeUser: T.object,
  handleLogin: T.func,
  handleLogout: T.func,
  isMobile: T.bool,
};

export default DesktopHeader;
