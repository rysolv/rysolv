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
  importOrganizationLoading,
  organizationData: { importUrl },
}) => {
  useEffect(() => document.getElementById('organizationImport').focus(), []);

  const handleKeypress = ({ key }) => {
    if (key === 'Enter') {
      handleSubmit();
    }
  };
  const onChangeHandler = e => {
    handleInputChange({
      field: 'importUrl',
      form: 'organizationData',
      value: e.target.value,
    });
  };
  return (
    <ImportFormContainer
      id="organizationImport"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      Import GitHub Organization
      <br />
      <BaseTextInputWithAdornment
        adornmentComponent={SearchIcon}
        disabled={importOrganizationLoading}
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
        onClick={() =>
          handleIncrementStep({ step: 2, view: 'addOrganization' })
        }
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
  importOrganizationLoading: T.bool,
  organizationData: T.object,
};

export default ImportForm;
