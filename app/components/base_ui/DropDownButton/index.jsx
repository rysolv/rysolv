import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import T from 'prop-types';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { StyledPrimaryButton, StyledMenu } from './styledComponents';

const DropDownButton = ({ greyscale, options, label }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = options.map(el => {
    const handleClick = () => {
      handleClose();
      el.onClick();
    };
    return (
      <MenuItem key={el.label} onClick={handleClick}>
        {el.label.toUpperCase()}
      </MenuItem>
    );
  });

  return (
    <>
      <StyledPrimaryButton
        aria-expanded={open ? 'true' : undefined}
        endIcon={<ArrowDropDown />}
        grey={greyscale ? 'true' : 'false'}
        id="dropDownButton"
        label={label}
        onClick={handleOpen}
      />
      <StyledMenu
        anchorEl={anchorEl}
        id="basic-menu"
        MenuListProps={{
          'aria-labelledby': 'dropDownButton',
        }}
        onClose={handleClose}
        open={open}
      >
        {menuItems}
      </StyledMenu>
    </>
  );
};

DropDownButton.propTypes = {
  greyscale: T.bool,
  label: T.string.isRequired,
  options: T.array.isRequired,
};

export default DropDownButton;
