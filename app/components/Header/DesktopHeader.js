import React from 'react';
import T from 'prop-types';
import { HeaderWrap } from '../base_ui';
import { AboutUs, ButtonsWrapper, Login, SignUp } from './styledComponent';

const DesktopHeader = ({ isMobile }) => (
  <HeaderWrap isMobile={isMobile}>
    <ButtonsWrapper>
      <AboutUs label="About Us" path="/about" />
      <Login label="Log In" path="/login" />
      <SignUp label="Sign Up" path="/signup" />
    </ButtonsWrapper>
  </HeaderWrap>
);

DesktopHeader.propTypes = {
  isMobile: T.bool,
};

export default DesktopHeader;
