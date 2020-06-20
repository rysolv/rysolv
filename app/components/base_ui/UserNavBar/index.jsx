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

const UserNavBar = ({ activeUser, handleNav, handleSignout, ...restProps }) => {
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
      <StyledUserNavBar
        id="userNavBar"
        onClick={() => handleOpen()}
        {...restProps}
      >
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
