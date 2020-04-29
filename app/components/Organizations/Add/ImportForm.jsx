import React from 'react';
import T from 'prop-types';

import { BaseTextInputWithAdornment } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import { ImportFormContainer, StyledLabel } from './styledComponents';

const SearchIcon = iconDictionary('search');

const ImportForm = ({
  data,
  handleIncrementStep,
  handleInputChange,
  handleSubmit,
}) => {
  const { importUrl } = data;
  const onChangeHandler = e => {
    handleInputChange({
      field: 'importUrl',
      form: 'data',
      value: e.target.value,
    });
  };

  return (
    <ImportFormContainer>
      Import GitHub Organization
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
        onClick={() => handleIncrementStep({ step: 2, view: 'addOrganization' })}
      >
        Manual
      </StyledLabel>
    </ImportFormContainer>
  );
};

ImportForm.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  handleSubmit: T.func,
};

export default ImportForm;
