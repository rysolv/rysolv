import React, { useState, Fragment } from 'react';
import T from 'prop-types';

import { DownArrow } from '../Icons';
import UserDropDownMenu from '../UserDropDown';
import CompanyDropDownMenu from '../../CompanyDropDownMenu';
import {
  Notification,
  StyledAvatar,
  StyledUserNavBar,
} from './styledComponents';

const UserNavBar = ({ activeUser, handleNav, handleSignout, ...restProps }) => {
  const { company, notifications, profilePic, username } = activeUser;
  const [anchorEl, setAnchorEl] = useState(null);

  const DropDownToRender = company ? CompanyDropDownMenu : UserDropDownMenu;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    document.getElementById('userNavBar');
    setAnchorEl(document.getElementById('userNavBar'));
  };

  return (
    <Fragment>
      <StyledUserNavBar
        id="userNavBar"
        onClick={() => handleOpen()}
        {...restProps}
      >
        <StyledAvatar alt={username} src={profilePic} />
        <Notification notifications={notifications} />
        <DownArrow />
      </StyledUserNavBar>
      <DropDownToRender
        activeUser={activeUser}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleNav={handleNav}
        handleSignout={handleSignout}
      />
    </Fragment>
  );
};

UserNavBar.propTypes = {
  activeUser: T.object,
  handleNav: T.func,
  handleSignout: T.func,
};

export default UserNavBar;
