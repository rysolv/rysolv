import React from 'react';
import T from 'prop-types';

import { BaseInputWithAdornment } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  AdminSubHeaderContainer,
  BaseInputContainer,
  StyledPrimaryButton,
} from './styledComponents';

const SearchIcon = iconDictionary('search');

const AdminSubHeader = ({
  disabled,
  handleInputChange,
  handleNav,
  handleSearch,
  route,
  search,
}) => {
  const { searchInput } = { ...search };
  const keyPress = ({ key }) => {
    if (key === 'Enter') {
      handleSearch({ value: searchInput.value });
    }
  };
  return (
    <AdminSubHeaderContainer>
      <BaseInputContainer>
        <BaseInputWithAdornment
          disabled={disabled}
          adornmentComponent={SearchIcon}
          onChange={e =>
            handleInputChange({
              field: 'searchInput',
              form: 'search',
              value: e.target.value,
            })
          }
          onClick={() => handleSearch({ value: searchInput.value })}
          onKeyDown={e => keyPress(e)}
          placeholder="Search..."
          position="end"
        />
      </BaseInputContainer>
      <StyledPrimaryButton label="Add" onClick={() => handleNav(route)} />
    </AdminSubHeaderContainer>
  );
};

AdminSubHeader.propTypes = {
  disabled: T.bool.isRequired,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearch: T.func,
  route: T.string,
  search: T.object,
};

export default AdminSubHeader;
