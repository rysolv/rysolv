import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  ButtonWrapper,
  DesktopHeaderContainer,
  Logo,
  LogoWrapper,
  StyledSecondaryButton,
  Wordmark,
} from './styledComponents';

const SiteLogo = iconDictionary('siteLogo');
const SiteWordmark = iconDictionary('siteWordmark');

const MobileLandingHeader = ({ handleNav }) => (
  <DesktopHeaderContainer>
    <LogoWrapper>
      <Logo>{SiteLogo}</Logo>
      <Wordmark>{SiteWordmark}</Wordmark>
    </LogoWrapper>
    <ButtonWrapper>
      <StyledSecondaryButton
        label="Sign up"
        onClick={() => handleNav('/signup')}
      />
    </ButtonWrapper>
  </DesktopHeaderContainer>
);

MobileLandingHeader.propTypes = { handleNav: T.func.isRequired };

export default MobileLandingHeader;
