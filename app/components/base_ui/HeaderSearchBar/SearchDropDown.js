import React from 'react';
import T from 'prop-types';

import ConditionalRender from '../ConditionalRender';
import { searchOptions } from './constants';
import {
  OptionTitle,
  OptionWrapper,
  RedirectIcon,
  SearchItemContainer,
  StyledSearchDropDown,
  ValueWrapper,
} from './styledComponents';

const SearchDropDown = ({
  handleChangeRoute,
  handleClose,
  handleSubmit,
  open,
  selectedRoute,
  value,
}) => {
  const SearchDropDownComponent = (
    <StyledSearchDropDown handleClose={handleClose}>
      {searchOptions.map(({ route, title }, index) => (
        <SearchItemContainer
          key={`search-item-${title}`}
          isSelectedRoute={route === selectedRoute}
          onKeyPress={() => handleSubmit({ route: selectedRoute })}
          onMouseDown={() => handleSubmit({ route: selectedRoute })}
          onMouseEnter={() => handleChangeRoute({ index, route })}
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
  handleChangeRoute: T.func.isRequired,
  handleClose: T.func.isRequired,
  handleSubmit: T.func.isRequired,
  open: T.bool.isRequired,
  selectedRoute: T.string.isRequired,
  value: T.string.isRequired,
};
export default SearchDropDown;
