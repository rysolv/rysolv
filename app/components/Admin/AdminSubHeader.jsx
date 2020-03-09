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
  handleInputChange,
  handleNav,
  handleSearchCompanies,
  search,
}) => {
  const { name } = { ...search };
  return (
    <AdminSubHeaderContainer>
      <BaseInputContainer>
        <BaseInputWithAdornment
          adornmentComponent={SearchIcon}
          onChange={e =>
            handleInputChange({
              field: 'name',
              form: 'search',
              value: e.target.value,
            })
          }
          onClick={() => handleSearchCompanies({ name: name.value })}
          placeholder="Search..."
          position="end"
        />
      </BaseInputContainer>
      <PrimaryButton
        label="Add"
        onClick={() => handleNav(`/admin/companies/add`)}
      />
    </AdminSubHeaderContainer>
  );
};

AdminSubHeader.propTypes = {
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchCompanies: T.func,
  search: T.object,
};

export default AdminSubHeader;
