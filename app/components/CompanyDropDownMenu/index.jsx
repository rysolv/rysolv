import React from 'react';
import T from 'prop-types';

import {
  HorizontalDivider,
  MenuInternalLink,
  StyledLoginButton,
  StyledMenu,
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

const CompanyDropDownMenu = ({ anchorEl, handleClose, handleSignout }) => (
  <MenuComponent
    anchorEl={anchorEl}
    disableScrollLock
    keepMounted
    onClick={handleClose}
    onClose={handleClose}
    open={Boolean(anchorEl)}
  >
    <MenuInternalLink
      label="Dashboard"
      path="/company/dashboard"
      shouldRemoveThird
    />
    <MenuInternalLink label="Jobs" path="/jobs" shouldRemoveSecond />
    <MenuInternalLink label="Messages" path="/messages" shouldRemoveFirst />
    <MenuInternalLink label="Payments" path="/company/settings/payments" />
    <MenuInternalLink label="Account &amp; Settings" path="/company/settings" />
    <HorizontalDivider />
    <StyledLoginButton onClick={handleSignout}>Sign out</StyledLoginButton>
  </MenuComponent>
);

CompanyDropDownMenu.propTypes = {
  anchorEl: T.object,
  handleClose: T.func.isRequired,
  handleSignout: T.func.isRequired,
};

export default CompanyDropDownMenu;
