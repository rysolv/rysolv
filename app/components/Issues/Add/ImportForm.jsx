import React, { useEffect } from 'react';
import T from 'prop-types';

import { BaseTextInputWithAdornment } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  ImportFormContainer,
  StyledImportError,
  StyledLabel,
} from './styledComponents';

const SearchIcon = iconDictionary('search');

const ImportForm = ({
  handleIncrementStep,
  handleInputChange,
  handleSubmit,
  importError,
  importIssueLoading,
  issueData: { importUrl },
}) => {
  useEffect(() => document.getElementById('issueImport').focus(), []);

  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      handleSubmit();
    }
  };
  const onChangeHandler = e => {
    handleInputChange({
      field: 'importUrl',
      form: 'issueData',
      value: e.target.value,
    });
  };
  return (
    <ImportFormContainer
      id="issueImport"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      Import GitHub Issue
      <br />
      <BaseTextInputWithAdornment
        adornmentComponent={SearchIcon}
        disabled={importIssueLoading}
        error={!!importUrl.error}
        helperText={importUrl.error || ''}
        name="url"
        onChange={onChangeHandler}
        onClick={handleSubmit}
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
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  handleSubmit: T.func,
  importError: T.object,
  importIssueLoading: T.bool,
  issueData: T.object,
};

export default ImportForm;
