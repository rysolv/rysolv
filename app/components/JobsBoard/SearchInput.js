import React from 'react';
import T from 'prop-types';

import {
  Input,
  SearchInputContainer,
  StyledPrimaryAsyncButton,
} from './styledComponents';

const SearchInput = ({ handleChangeInput, onBlur, value }) => (
  <SearchInputContainer>
    <Input
      height="4.9rem"
      onBlur={onBlur}
      onChange={e => handleChangeInput(e.target.value)}
      type="text"
      value={value}
    />
    <StyledPrimaryAsyncButton onClick={() => {}} label="Search" />
  </SearchInputContainer>
);

SearchInput.propTypes = {
  handleChangeInput: T.func.isRequired,
  onBlur: T.func.isRequired,
  value: T.string.isRequired,
};

export default SearchInput;
