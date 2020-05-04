import React from 'react';
import T from 'prop-types';

import { HeaderWrap, UserNavBar } from '../base_ui';
import { Admin, ButtonsWrapper, Login, SignUp, Test } from './styledComponents';

const DesktopHeader = ({
  activeUser,
  handleLogin,
  handleLogout,
  isLoggedIn,
  isMobile,
}) => {
  const handleSignin = e => {
    e.preventDefault();
    handleLogin({ userId: 'b519b064-b5db-4472-ad1b-00e30bdbfa4c' });
  };
  return (
    <HeaderWrap isMobile={isMobile}>
      <ButtonsWrapper>
        <Admin label="Admin [temp]" path="/admin/organizations" />
        <SignUp label="Sign Up" path="/signup" />
        <Test label="Test" path="/test" />

        {isLoggedIn ? (
          <UserNavBar activeUser={activeUser} handleLogout={handleLogout} />
        ) : (
          <Login label="Sign In" path="/login" onClick={e => handleSignin(e)} />
        )}
      </ButtonsWrapper>
    </HeaderWrap>
  );
};

DesktopHeader.propTypes = {
  activeUser: T.object,
  handleLogin: T.func,
  handleLogout: T.func,
  isLoggedIn: T.bool,
  isMobile: T.bool,
};

export default DesktopHeader;
