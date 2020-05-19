import React from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';
import { BaseTextInputWithAdornment } from 'components/base_ui';
import {
  ImportFormContainer,
  StyledImportError,
  StyledLabel,
} from './styledComponents';

const SearchIcon = iconDictionary('search');

const ImportForm = ({
  data,
  handleIncrementStep,
  handleInputChange,
  handleSubmit,
  importError,
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
      Import GitHub Issue
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
      <StyledImportError>
        {importError.error ? importError.message : null}
      </StyledImportError>
      or
      <StyledLabel
        onClick={() => handleIncrementStep({ step: 2, view: 'addIssue' })}
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
  importError: T.object,
};

export default ImportForm;
