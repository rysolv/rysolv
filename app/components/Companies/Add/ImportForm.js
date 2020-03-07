import React from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';
import { BaseTextInputWithAdornment } from 'components/base_ui';
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
    handleInputChange({ field: 'importUrl', value: e.target.value });
  };

  return (
    <ImportFormContainer>
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
