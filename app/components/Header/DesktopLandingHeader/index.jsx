import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  ButtonWrapper,
  DesktopHeaderContainer,
  InternalLink,
  Logo,
  LogoWrapper,
  StyledPrimaryButton,
  StyledSecondaryButton,
  VerticalDivider,
  Wordmark,
} from './styledComponents';

const SiteLogo = iconDictionary('siteLogo');
const SiteWordmark = iconDictionary('siteWordmark');

const DesktopLandingHeader = ({ handleNav }) => (
  <DesktopHeaderContainer>
    <LogoWrapper>
      <Logo>{SiteLogo}</Logo>
      <Wordmark>{SiteWordmark}</Wordmark>
    </LogoWrapper>
    <ButtonWrapper>
      <InternalLink label="Browse issues" path="/issues" />
      <InternalLink label="Add your team" path="/repos/add" />
      <VerticalDivider />
      <StyledSecondaryButton
        label="Sign up"
        onClick={() => handleNav('/signup')}
      />
      <StyledPrimaryButton
        label="Log in"
        onClick={() => handleNav('/signin')}
      />
    </ButtonWrapper>
  </DesktopHeaderContainer>
);

DesktopLandingHeader.propTypes = { handleNav: T.func.isRequired };

export default DesktopLandingHeader;
