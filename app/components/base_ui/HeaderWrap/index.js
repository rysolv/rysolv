import React from 'react';
import T from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Logo from './Logo';
import { Container, HeaderSection, LogoWrapper } from './styledComponents';

const HeaderWrap = ({ children, isMobile }) => (
  <HeaderSection id="header-section" role="banner">
    <AppBar color="default">
      <Container>
        <LogoWrapper>
          <Logo isMobile={isMobile} />
          <div>Rysolv</div>
        </LogoWrapper>
        {children}
      </Container>
    </AppBar>
  </HeaderSection>
);

HeaderWrap.propTypes = {
  children: T.element,
  isMobile: T.bool,
};

export default HeaderWrap;
