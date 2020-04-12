import React from 'react';
import T from 'prop-types';
import { HeaderWrap } from '../base_ui';
import { Admin, ButtonsWrapper, Login, SignUp, Test } from './styledComponent';

const DesktopHeader = ({ isMobile }) => (
  <HeaderWrap isMobile={isMobile}>
    <ButtonsWrapper>
      <Admin label="Admin [temp]" path="/admin/companies" />
      <Login label="Log In" path="/login" />
      <SignUp label="Sign Up" path="/signup" />
      <Test label="Test" path="/test" />
    </ButtonsWrapper>
  </HeaderWrap>
);

DesktopHeader.propTypes = {
  isMobile: T.bool,
};

export default DesktopHeader;
