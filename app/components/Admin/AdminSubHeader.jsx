import React from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';
import { BaseInputWithAdornment, PrimaryButton } from 'components/base_ui';
import {
  AdminSubHeaderContainer,
  BaseInputContainer,
} from './styledComponents';

const SearchIcon = iconDictionary('search');

const AdminSubHeader = ({ handleNav }) => (
  <AdminSubHeaderContainer>
    <BaseInputContainer>
      <BaseInputWithAdornment
        adornmentComponent={SearchIcon}
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

AdminSubHeader.propTypes = {
  handleNav: T.func,
};

export default AdminSubHeader;
