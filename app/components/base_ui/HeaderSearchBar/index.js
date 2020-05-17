import React, { useState } from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';

import SearchDropDown from './SearchDropDown';
import {
  HeaderSearchBarContainer,
  StyledBaseInputWithAdornment,
} from './styledComponents';

const SearchIcon = iconDictionary('search');

const HeaderSearchBar = ({ handleNav }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <HeaderSearchBarContainer>
      <StyledBaseInputWithAdornment
        adornmentComponent={SearchIcon}
        onBlur={handleClose}
        onChange={e => setValue(e.target.value)}
        onFocus={handleClick}
        placeholder="Search or jump to..."
        position="end"
        renderIcon
        value={value}
      />
      <SearchDropDown
        handleClose={handleClose}
        handleNav={handleNav}
        open={open}
        setValue={setValue}
        value={value}
      />
    </HeaderSearchBarContainer>
  );
};

HeaderSearchBar.propTypes = {
  handleNav: T.func,
};

export default HeaderSearchBar;
