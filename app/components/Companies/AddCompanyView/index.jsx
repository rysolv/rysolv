import React from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';
import { BaseTextInputWithAdornment } from 'components/base_ui';
import { AddCompanyContainer, StyledLabel } from './styledComponents';

const SearchIcon = iconDictionary('search');

const AddCompany = ({
  errors,
  handleIncrementStep,
  handleInputChange,
  handleSubmit,
  inputs,
}) => {
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
        onClick={handleSubmit}
        onChange={onChangeHandler}
        position="end"
        value={inputs.url}
      />
      or
      <StyledLabel onClick={() => handleIncrementStep({ step: 2 })}>
        Manual
      </StyledLabel>
    </AddCompanyContainer>
  );
};

AddCompany.propTypes = {
  errors: T.object,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  handleSubmit: T.func,
  inputs: T.object,
};

export default AddCompany;
