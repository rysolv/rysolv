import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import UserActivityMenu from './UserActivityMenu';
import { StyledDownArrow, UserActivityContainer } from './styledComponents';
import { DropdownButtonWrapper } from '../styledComponents';

const AddIcon = iconDictionary('add');

const UserActivityDropdown = ({ handleNav }) => {
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
      <DropdownButtonWrapper onClick={e => handleOpen(e)}>
        {AddIcon}
        <StyledDownArrow />
      </DropdownButtonWrapper>
      <UserActivityMenu
        handleClose={handleClose}
        handleNav={handleNav}
        menuClickHandler={menuClickHandler}
        open={open}
      />
    </UserActivityContainer>
  );
};

UserActivityDropdown.propTypes = { handleNav: T.func.isRequired };

export default UserActivityDropdown;
