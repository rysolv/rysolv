import React from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';
import { BaseTextInputWithAdornment, BaseLink } from 'components/base_ui';
import { AddCompanyContainer } from './styledComponents';

const SearchIcon = iconDictionary('search');

const AddCompany = ({ errors, handleInputChange, handleSubmit, inputs }) => {
  const onChangeHandler = e => {
    handleInputChange({
      category: 'importUrl',
      field: e.target.name,
      value: e.target.value,
      view: 'add',
    });
  };

  return (
    <AddCompanyContainer>
      Import GitHub&nbsp;
      <BaseTextInputWithAdornment
        adornmentComponent={SearchIcon}
        error={!!errors.url}
        helperText={errors.url || ''}
        name="url"
        onChange={onChangeHandler}
        onBlur={handleSubmit}
        position="end"
        value={inputs.url}
      />
      or <BaseLink label="Manual" path="/admin/companies/add/manual" />
    </AddCompanyContainer>
  );
};

AddCompany.propTypes = {
  errors: T.object,
  handleInputChange: T.func,
  handleSubmit: T.func,
  inputs: T.object,
};

export default AddCompany;
