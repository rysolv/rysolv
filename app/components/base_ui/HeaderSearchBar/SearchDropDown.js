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
    title: 'In Issues',
  },
  {
    route: '/organizations/search/',
    title: 'In Organizations',
  },
  {
    route: '/users/search/',
    title: 'In Users',
  },
];

const SearchDropDown = ({ handleClose, handleNav, open, setValue, value }) => {
  const handleSubmit = ({ route }) => {
    handleNav(`${route}${value}`);
    setValue('');
  };
  const SearchDropDownComponent = (
    <StyledSearchDropDown handleClose={handleClose}>
      {searchOptions.map(({ route, title }) => (
        <SearchItemContainer
          key={`search-item-${title}`}
          onMouseDown={() => handleSubmit({ route })}
          onKeyPress={() => handleSubmit({ route })}
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
  setValue: T.func,
  value: T.string,
};
export default SearchDropDown;
