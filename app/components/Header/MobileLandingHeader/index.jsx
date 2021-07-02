import React, { useState } from 'react';
import T from 'prop-types';

import {
  ButtonWrapper,
  HorizontalDivider,
  InternalLink,
  LogoContainer,
  LogoText,
  LogoWrapper,
  MobileHeaderContainer,
  StyledExpandIcon,
  StyledLoginLink,
  StyledMenu,
  StyledSecondaryButton,
} from './styledComponents';

const MenuComponent = props => (
  <StyledMenu
    anchorOrigin={{
      horizontal: 'right',
      vertical: 'bottom',
    }}
    elevation={0}
    getContentAnchorEl={null}
    transformOrigin={{
      horizontal: 'right',
      vertical: 'top',
    }}
    {...props}
  />
);

const MobileLandingHeader = ({ handleNav }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = () => {
    document.getElementById('mobileNavDropDown');
    setAnchorEl(document.getElementById('mobileNavDropDown'));
  };

  return (
    <MobileHeaderContainer>
      <LogoWrapper>
        <LogoContainer />
        <LogoText>rysolv</LogoText>
      </LogoWrapper>
      <ButtonWrapper>
        <StyledSecondaryButton
          label="Sign up"
          onClick={() => handleNav('/signup')}
        />
        <StyledExpandIcon id="mobileNavDropDown" onClick={() => handleOpen()} />
      </ButtonWrapper>
      <MenuComponent
        anchorEl={anchorEl}
        disableScrollLock
        keepMounted
        onClick={() => handleClose()}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <StyledLoginLink label="Log in" path="/signin" />
        <HorizontalDivider />
        <InternalLink label="Browse issues" path="/issues" />
        <InternalLink label="Add your team" path="/repos" />
      </MenuComponent>
    </MobileHeaderContainer>
  );
};

MobileLandingHeader.propTypes = { handleNav: T.func.isRequired };

export default MobileLandingHeader;
