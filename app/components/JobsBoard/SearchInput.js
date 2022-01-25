import React from 'react';
import T from 'prop-types';

import {
  Input,
  SearchInputContainer,
  StyledPrimaryAsyncButton,
} from './styledComponents';

const SearchInput = ({ handleChangeFilter, handleChangeInput, value }) => (
  <SearchInputContainer>
    <Input
      height="4.9rem"
      onChange={e => handleChangeInput(e.target.value)}
      type="text"
      placeholder="Search by role, skill, etc."
      value={value}
    />
    <StyledPrimaryAsyncButton onClick={handleChangeFilter} label="Search" />
  </SearchInputContainer>
);

SearchInput.propTypes = {
  handleChangeFilter: T.func.isRequired,
  handleChangeInput: T.func.isRequired,
  value: T.string.isRequired,
};

export default SearchInput;
