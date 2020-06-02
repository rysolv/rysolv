import React, { Fragment } from 'react';
import { Divider, Logo, SplashImage, TagLine } from './styledComponents';

const DesktopSplash = () => (
  <Fragment>
    <SplashImage>
      <Logo>RYSOLV</Logo>
      <TagLine>Fixing the internet. One bug at a time</TagLine>
    </SplashImage>
    <Divider />
  </Fragment>
);

export default DesktopSplash;
