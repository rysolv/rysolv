import React from 'react';
import T from 'prop-types';

import ConditionalRender from '../ConditionalRender';

import {
  OptionTitle,
  OptionWrapper,
  RedirectIcon,
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
        <SearchItemContainer
          key={`search-item-${title}`}
          onMouseDown={() => handleNav(`${route}${value}`)}
        >
          <ValueWrapper>{value}</ValueWrapper>
          <OptionWrapper>
            <OptionTitle>
              {title}
              <RedirectIcon>↵</RedirectIcon>
            </OptionTitle>
          </OptionWrapper>
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
