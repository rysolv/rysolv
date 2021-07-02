import React from 'react';
import { useHistory } from 'react-router-dom';

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

const DesktopLandingHeader = () => {
  const history = useHistory();
  return (
    <DesktopHeaderContainer>
      <LogoWrapper>
        <LogoText>rysolv</LogoText>
      </LogoWrapper>
      <ButtonWrapper>
        <InternalLink label="Browse issues" path="/issues" />
        <InternalLink label="Add your team" path="/repos" />
        <VerticalDivider />
        <StyledSecondaryButton
          label="Sign up"
          onClick={() => history.push('/signup')}
        />
        <StyledPrimaryButton
          label="Log in"
          onClick={() => history.push('/signin')}
        />
      </ButtonWrapper>
    </DesktopHeaderContainer>
  );
};

DesktopLandingHeader.propTypes = {};

export default DesktopLandingHeader;
