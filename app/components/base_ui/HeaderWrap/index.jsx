import React from 'react';
import T from 'prop-types';
import AppBar from '@material-ui/core/AppBar';

import Logo from './Logo';
import HeaderSearchBar from '../HeaderSearchBar';
import { Container, HeaderSection, LogoWrapper } from './styledComponents';

const HeaderWrap = ({ children, handleNav, isMobile }) => (
  <HeaderSection id="header-section" role="banner">
    <AppBar color="default">
      <Container>
        <LogoWrapper>
          <Logo isMobile={isMobile} />
          <HeaderSearchBar handleNav={handleNav} />
        </LogoWrapper>
        {children}
      </Container>
    </AppBar>
  </HeaderSection>
);

HeaderWrap.propTypes = {
  children: T.element,
  handleNav: T.func,
  isMobile: T.bool,
};

export default HeaderWrap;
