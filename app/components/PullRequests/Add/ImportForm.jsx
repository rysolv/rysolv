import React from 'react';
import T from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';

import {
  ButtonGroup,
  ImportFormContainer,
  ImportUrlLabel,
  ImportUrlWrapper,
  StyledHeader,
  StyledPrimaryAsyncButton,
  StyledSecondayButton,
  StyledTextareaAutosize,
  TextareaWrapper,
} from './styledComponents';

const ImportForm = ({
  error,
  handleClose,
  handleImport,
  handleInputChange,
  importData,
  loading,
}) => {
  const { importUrl } = importData;
  const handleChange = e => {
    handleInputChange({
      field: 'importUrl',
      form: 'importData',
      value: e.target.value,
    });
  };
  return (
    <ImportFormContainer>
      <StyledHeader>Import Pull Request</StyledHeader>
      <ImportUrlWrapper>
        <ImportUrlLabel>Pull Request URL</ImportUrlLabel>
        <TextareaWrapper>
          <StyledTextareaAutosize
            disabled={loading}
            onChange={handleChange}
            rows={2}
            value={importUrl.value}
          />
          <FormHelperText error={!!error}>{error}</FormHelperText>
        </TextareaWrapper>
      </ImportUrlWrapper>
      <ButtonGroup>
        <StyledSecondayButton label="Cancel" onClick={handleClose} />
        <StyledPrimaryAsyncButton
          label="Import"
          loading={loading}
          onClick={() => handleImport()}
        />
      </ButtonGroup>
    </ImportFormContainer>
  );
};

ImportForm.propTypes = {
  error: T.string,
  handleClose: T.func,
  handleImport: T.func,
  handleInputChange: T.func,
  importData: T.object,
  loading: T.bool,
};

export default ImportForm;
