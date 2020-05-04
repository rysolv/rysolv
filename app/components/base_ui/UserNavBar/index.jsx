import React, { useState, Fragment } from 'react';
import T from 'prop-types';

import { Star, DownArrow } from '../Icons';
import UserDropDownMenu from '../UserDropDown';
import {
  IconWrapper,
  NumberContainer,
  StyledAvatar,
  StyledUserNavBar,
} from './styledComponents';

const UserNavBar = ({ activeUser, handleLogout }) => {
  const { username, profilePic, rep } = activeUser;
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
      <StyledUserNavBar onClick={() => handleOpen()} id="userNavBar">
        <IconWrapper>
          <Star />
          <NumberContainer>{rep}</NumberContainer>
        </IconWrapper>
        <StyledAvatar alt={username} src={profilePic} />
        <DownArrow />
      </StyledUserNavBar>
      <UserDropDownMenu
        activeUser={activeUser}
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleLogout={handleLogout}
      />
    </Fragment>
  );
};

UserNavBar.propTypes = {
  activeUser: T.object,
  handleLogout: T.func,
};

export default UserNavBar;
