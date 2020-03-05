import React from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';
import { BaseTextInputWithAdornment } from 'components/base_ui';
import { AddCompanyContainer, StyledLabel } from './styledComponents';

const SearchIcon = iconDictionary('search');

const AddCompany = ({
  data,
  handleIncrementStep,
  handleInputChange,
  handleSubmit,
}) => {
  const { importUrl } = data;
  const onChangeHandler = e => {
    handleInputChange({ field: 'importUrl', value: e.target.value });
  };

  return (
    <AddCompanyContainer>
      Import GitHub&nbsp;
      <BaseTextInputWithAdornment
        adornmentComponent={SearchIcon}
        error={!!importUrl.error}
        helperText={importUrl.error || ''}
        name="url"
        onClick={handleSubmit}
        onChange={onChangeHandler}
        position="end"
        value={importUrl.value}
      />
      or
      <StyledLabel
        onClick={() => handleIncrementStep({ step: 2, view: 'addCompany' })}
      >
        Manual
      </StyledLabel>
    </AddCompanyContainer>
  );
};

AddCompany.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  handleSubmit: T.func,
};

export default AddCompany;
