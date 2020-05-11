import React from 'react';
import T from 'prop-types';

import { BaseInputWithAdornment } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  BaseInputWrapper,
  DropDownMenuWrapper,
  SearchHeaderContainer,
  StyledBaseDropDownMenu,
  StyledLabel,
} from './styledComponents';

const SearchIcon = iconDictionary('search');

const SearchHeader = ({
  handleChangeFilter,
  handleChangeSearch,
  overviewFilter,
  placeholder,
  values,
}) => (
  <SearchHeaderContainer>
    <BaseInputWrapper hasMargin={false}>
      <BaseInputWithAdornment
        adornmentComponent={SearchIcon}
        onChange={e =>
          handleChangeSearch({
            field: 'overviewInput',
            value: e.target.value,
          })
        }
        placeholder={placeholder}
        position="end"
        renderIcon
      />
    </BaseInputWrapper>
    <DropDownMenuWrapper>
      <StyledLabel>Sort by:</StyledLabel>
      <StyledBaseDropDownMenu
        handleChange={value =>
          handleChangeFilter({ field: 'overview', form: 'filter', value })
        }
        selectedValue={overviewFilter}
        values={values}
      />
    </DropDownMenuWrapper>
  </SearchHeaderContainer>
);

SearchHeader.propTypes = {
  handleChangeFilter: T.func,
  handleChangeSearch: T.func,
  overviewFilter: T.string.isRequired,
  placeholder: T.string.isRequired,
  values: T.array.isRequired,
};

export default SearchHeader;
