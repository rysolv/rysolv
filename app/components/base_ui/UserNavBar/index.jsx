import React, { useState, Fragment } from 'react';
import T from 'prop-types';

import { Coin, DownArrow } from '../Icons';
import UserDropDownMenu from '../UserDropDown';
import {
  IconWrapper,
  Notification,
  NumberContainer,
  StyledAvatar,
  StyledUserNavBar,
} from './styledComponents';

const UserNavBar = ({ activeUser, handleNav, handleSignout, ...restProps }) => {
  const { notifications, profilePic, rep, username } = activeUser;
  const [anchorEl, setAnchorEl] = useState(null);
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
        <IconWrapper>
          <Coin />
          <NumberContainer>{rep}</NumberContainer>
        </IconWrapper>
        <Fragment>
          <StyledAvatar alt={username} src={profilePic} />
          <Notification notifications={notifications} />
        </Fragment>
        <DownArrow />
      </StyledUserNavBar>
      <UserDropDownMenu
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
