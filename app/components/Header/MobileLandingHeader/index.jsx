import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  ButtonWrapper,
  HorizontalDivider,
  InternalLink,
  Logo,
  LogoWrapper,
  MenuInternalLink,
  MobileHeaderContainer,
  StyledExpandIcon,
  StyledLoginLink,
  StyledMenu,
  StyledSecondaryButton,
  StyledUserNavBar,
  VerticalDivider,
  Wordmark,
} from './styledComponents';

const SiteLogo = iconDictionary('siteLogo');
const SiteWordmark = iconDictionary('siteWordmark');

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

const MobileLandingHeader = ({
  activeUser,
  handleNav,
  handleSignout,
  isSignedIn,
}) => {
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
      <LogoWrapper onClick={() => handleNav('/')}>
        <Logo>{SiteLogo}</Logo>
        <Wordmark>{SiteWordmark}</Wordmark>
      </LogoWrapper>
      <ButtonWrapper>
        {isSignedIn ? (
          <Fragment>
            <InternalLink
              label="Browse issues"
              path="/issues"
              shouldRemoveSecond
            />
            <InternalLink
              label="Add your team"
              path="/repos/add"
              shouldRemoveFirst
            />
            <VerticalDivider />
            <StyledUserNavBar
              activeUser={activeUser}
              handleNav={handleNav}
              handleSignout={handleSignout}
            />
          </Fragment>
        ) : (
          <Fragment>
            <StyledSecondaryButton
              label="Sign up"
              onClick={() => handleNav('/signup')}
            />
            <StyledExpandIcon id="mobileNavDropDown" onClick={handleOpen} />
          </Fragment>
        )}
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
        <MenuInternalLink label="Browse issues" path="/issues" />
        <MenuInternalLink label="Add your team" path="/repos" />
      </MenuComponent>
    </MobileHeaderContainer>
  );
};

MobileLandingHeader.propTypes = {
  activeUser: T.object.isRequired,
  handleNav: T.func.isRequired,
  handleSignout: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
};

export default MobileLandingHeader;
