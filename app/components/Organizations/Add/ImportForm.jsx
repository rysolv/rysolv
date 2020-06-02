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
  handleIncrementStep,
  handleInputChange,
  handleSubmit,
  importError,
  importOrganizationLoading,
  organizationData,
}) => {
  const { importUrl } = organizationData;
  const onChangeHandler = e => {
    handleInputChange({
      field: 'importUrl',
      form: 'organizationData',
      value: e.target.value,
    });
  };

  return (
    <ImportFormContainer>
      Import GitHub Organization
      <br />
      <BaseTextInputWithAdornment
        disabled={importOrganizationLoading}
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
