import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';

import { searchOptions } from './constants';
import SearchDropDown from './SearchDropDown';
import {
  HeaderSearchBarContainer,
  StyledBaseInputWithAdornment,
} from './styledComponents';

const SearchIcon = iconDictionary('search');

const HeaderSearchBar = ({ handleNav, ...restProps }) => {
  const { route: currRoute } = searchOptions[0];
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState(currRoute);
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue('');
  }, [window.location.pathname]);
  const handleChangeRoute = ({ index, route }) => {
    setSelectedIndex(index);
    setSelectedRoute(route);
  };

  const handleChangeSearch = e => {
    const { value: newValue } = e.target;
    setValue(newValue);
    if (newValue) setOpen(true);
    if (!newValue) handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIndex(0);
    setSelectedRoute(currRoute);
  };

  const handleFocus = () => {
    if (value) setOpen(true);
  };

  const handleKeyPress = ({ key }) => {
    if (key === 'ArrowUp') {
      const nextIndex = selectedIndex - 1;
      if (nextIndex >= 0) {
        const { route: nextRoute } = searchOptions[nextIndex];
        handleChangeRoute({ index: nextIndex, route: nextRoute });
      }
    }
    if (key === 'ArrowDown') {
      const nextIndex = selectedIndex + 1;
      if (nextIndex <= 2) {
        const { route: nextRoute } = searchOptions[nextIndex];
        handleChangeRoute({ index: nextIndex, route: nextRoute });
      }
    }
    if (key === 'Enter') {
      handleSubmit({ route: selectedRoute });
    }
  };

  const handleSubmit = ({ route }) => {
    handleClose();
    handleNav(`${route}${value}`);
    setValue('');
  };
  return (
    <HeaderSearchBarContainer
      id="searchBar"
      onKeyDown={e => handleKeyPress(e)}
      tabIndex="0"
      {...restProps}
    >
      <StyledBaseInputWithAdornment
        adornmentComponent={SearchIcon}
        onBlur={handleClose}
        onChange={e => handleChangeSearch(e)}
        onFocus={handleFocus}
        open={open}
        placeholder="Search or jump to..."
        position="end"
        renderIcon
        value={value}
      />
      <SearchDropDown
        handleChangeRoute={handleChangeRoute}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        open={open}
        selectedRoute={selectedRoute}
        value={value}
      />
    </HeaderSearchBarContainer>
  );
};

HeaderSearchBar.propTypes = {
  handleNav: T.func,
};

export default HeaderSearchBar;
