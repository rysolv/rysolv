import React from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';
import { BaseInputWithAdornment, PrimaryButton } from 'components/base_ui';
import {
  AdminSubHeaderContainer,
  BaseInputContainer,
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
  const { name } = { ...search };
  return (
    <AdminSubHeaderContainer>
      <BaseInputContainer>
        <BaseInputWithAdornment
          disabled={disabled}
          adornmentComponent={SearchIcon}
          onChange={e =>
            handleInputChange({
              field: 'name',
              form: 'search',
              value: e.target.value,
            })
          }
          onClick={() => handleSearch({ name: name.value })}
          placeholder="Search..."
          position="end"
        />
      </BaseInputContainer>
      <PrimaryButton label="Add" onClick={() => handleNav(route)} />
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
