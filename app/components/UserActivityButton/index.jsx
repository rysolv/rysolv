import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import UserActivityMenu from './UserActivityMenu';
import {
  StyledDownArrow,
  UserActivityButtonWrapper,
  UserActivityContainer,
} from './styledComponents';

const AddIcon = iconDictionary('add');

const UserActivityButton = ({ handleNav }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const documentClickHandler = () => {
      setOpen(false);
    };
    document.addEventListener('click', documentClickHandler);
    return () => document.removeEventListener('click', documentClickHandler);
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = e => {
    menuClickHandler(e);
    setOpen(true);
  };
  const menuClickHandler = e => {
    e.nativeEvent.stopImmediatePropagation();
  };
  return (
    <UserActivityContainer>
      <UserActivityButtonWrapper onClick={e => handleOpen(e)}>
        {AddIcon}
        <StyledDownArrow />
      </UserActivityButtonWrapper>
      <UserActivityMenu
        handleClose={handleClose}
        handleNav={handleNav}
        menuClickHandler={menuClickHandler}
        open={open}
      />
    </UserActivityContainer>
  );
};

UserActivityButton.propTypes = { handleNav: T.func.isRequired };

export default UserActivityButton;
