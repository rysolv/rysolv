import React from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';
import { BaseInputWithAdornment, PrimaryButton } from 'components/base_ui';
import {
  AdminSubHeaderContainer,
  BaseInputContainer,
} from './styledComponents';

const SearchIcon = iconDictionary('search', 'small');

const AdminSubHeader = ({ handleChange, handleClick, handleNav }) => (
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
      onClick={() => handleNav(`/admin/add/company/`)}
    />
  </AdminSubHeaderContainer>
);

AdminSubHeader.propTypes = {
  handleChange: T.func,
  handleClick: T.func,
  handleNav: T.func,
};

export default AdminSubHeader;
