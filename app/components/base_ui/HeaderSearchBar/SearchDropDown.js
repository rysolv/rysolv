import React from 'react';
import T from 'prop-types';

import ConditionalRender from '../ConditionalRender';

import {
  OptionWrapper,
  SearchItemContainer,
  StyledSearchDropDown,
  ValueWrapper,
} from './styledComponents';

const searchOptions = [
  {
    route: '/issues/search/',
    title: 'All Issues',
  },
  {
    route: '/organizations/search/',
    title: 'All Organizations',
  },
  {
    route: '/users/search/',
    title: 'All Users',
  },
];

const SearchDropDown = ({ handleClose, handleNav, open, value }) => {
  const SearchDropDownComponent = (
    <StyledSearchDropDown handleClose={handleClose}>
      {searchOptions.map(({ route, title }) => (
        <SearchItemContainer onClick={() => handleNav(`${route}${value}`)}>
          <ValueWrapper>{value}</ValueWrapper>
          <OptionWrapper>{title}</OptionWrapper>
        </SearchItemContainer>
      ))}
    </StyledSearchDropDown>
  );
  return (
    <ConditionalRender
      Component={SearchDropDownComponent}
      shouldRender={open}
    />
  );
};

SearchDropDown.propTypes = {
  handleClose: T.func,
  handleNav: T.func,
  open: T.bool,
  value: T.string,
};
export default SearchDropDown;
