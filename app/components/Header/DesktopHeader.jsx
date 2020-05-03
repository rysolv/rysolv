import React from 'react';
import T from 'prop-types';

import { HeaderWrap, UserNavBar } from '../base_ui';
import { Admin, ButtonsWrapper, Login, SignUp, Test } from './styledComponents';

const DesktopHeader = ({ activeUser, isMobile }) => (
  <HeaderWrap isMobile={isMobile}>
    <ButtonsWrapper>
      <Admin label="Admin [temp]" path="/admin/organizations" />
      <Login label="Log In" path="/login" />
      <SignUp label="Sign Up" path="/signup" />
      <Test label="Test" path="/test" />
      <UserNavBar activeUser={activeUser} />
    </ButtonsWrapper>
  </HeaderWrap>
);

DesktopHeader.propTypes = {
  activeUser: T.object,
  isMobile: T.bool,
};

export default DesktopHeader;
