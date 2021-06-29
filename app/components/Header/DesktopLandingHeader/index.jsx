import React from 'react';

import {
  ButtonWrapper,
  DesktopHeaderContainer,
  InternalLink,
  LogoText,
  LogoWrapper,
  StyledPrimaryButton,
  StyledSecondaryButton,
  VerticalDivider,
} from './styledComponents';

const DesktopLandingHeader = () => (
  <DesktopHeaderContainer>
    <LogoWrapper>
      <div />
      <LogoText>rysolv</LogoText>
    </LogoWrapper>
    <ButtonWrapper>
      <InternalLink label="Browse issues" path="/issues" />
      <InternalLink label="Add your team" path="/repos/add" />
      <VerticalDivider />
      <StyledSecondaryButton label="Sign up" onClick={() => {}} />
      <StyledPrimaryButton label="Log in" onClick={() => {}} />
    </ButtonWrapper>
  </DesktopHeaderContainer>
);

DesktopLandingHeader.propTypes = {};

export default DesktopLandingHeader;
