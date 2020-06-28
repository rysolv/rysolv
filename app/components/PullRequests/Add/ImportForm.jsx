import React from 'react';
import T from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';

import {
  ButtonGroup,
  ImportForm,
  ImportUrlContainer,
  ImportUrlLabel,
  StyledHeader,
  StyledPrimaryAsyncButton,
  StyledSecondayButton,
  StyledTextareaAutosize,
  TextareaWrapper,
} from './styledComponents';

const ImportPullRequest = ({
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
    <ImportForm>
      <StyledHeader>Import Pull Request</StyledHeader>
      <ImportUrlContainer>
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
      </ImportUrlContainer>
      <ButtonGroup>
        <StyledSecondayButton label="Cancel" onClick={handleClose} />
        <StyledPrimaryAsyncButton
          label="Import"
          loading={loading}
          onClick={() => handleImport()}
        />
      </ButtonGroup>
    </ImportForm>
  );
};

ImportPullRequest.propTypes = {
  error: T.string,
  handleClose: T.func,
  handleImport: T.func,
  handleInputChange: T.func,
  importData: T.object,
  loading: T.bool,
};

export default ImportPullRequest;
