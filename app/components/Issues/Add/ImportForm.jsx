import React, { useEffect } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import UserIssues from './UserIssues';
import {
  ImportFormContainer,
  MessageWrapper,
  StyledBaseLink,
  StyledBaseTextInputWithAdornment,
  StyledImportError,
  // StyledLabel,
} from './styledComponents';

const GithubIcon = iconDictionary('github');
const SearchIcon = iconDictionary('search');

const ImportForm = ({
  // handleIncrementStep,
  handleInputChange,
  handleSubmit,
  importError,
  importIssueLoading,
  isGithubVerified,
  issueData: { autoImportUrl, importUrl },
  userIssues,
  userIssuesLoading,
}) => {
  useEffect(() => document.getElementById('issueImport').focus(), []);

  useEffect(() => {
    const { error, value } = autoImportUrl;
    if (!error && value) {
      handleSubmit();
    }
  }, [autoImportUrl]);

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

  const UnauthenticatedMessage = (
    <MessageWrapper>
      {GithubIcon}
      <StyledBaseLink label="Link your Github account" path="/settings" /> for
      easier importing.
    </MessageWrapper>
  );

  return (
    <ImportFormContainer
      id="issueImport"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      Import GitHub Issue
      <br />
      <StyledBaseTextInputWithAdornment
        adornmentComponent={SearchIcon}
        disabled={importIssueLoading}
        error={!!importUrl.error}
        helperText={importUrl.error || ''}
        name="url"
        onChange={onChangeHandler}
        onClick={handleSubmit}
        placeholder="https://www.github.com/rysolv/rysolv/issues/1"
        position="end"
        value={importUrl.value}
      />
      <StyledImportError>
        {importError.error ? importError.message : null}
      </StyledImportError>
      <ConditionalRender
        Component={UserIssues}
        FallbackComponent={UnauthenticatedMessage}
        propsToPassDown={{
          handleInputChange,
          userIssues,
          userIssuesLoading,
        }}
        shouldRender={isGithubVerified}
      />
      {/* or
      <StyledLabel
        onClick={() => handleIncrementStep({ step: 2, view: 'addIssue' })}
      >
        Manual
      </StyledLabel> */}
    </ImportFormContainer>
  );
};

ImportForm.propTypes = {
  // handleIncrementStep: T.func,
  handleInputChange: T.func,
  handleSubmit: T.func,
  importError: T.object,
  importIssueLoading: T.bool,
  isGithubVerified: T.bool,
  issueData: T.object,
  userIssues: T.array,
  userIssuesLoading: T.bool,
};

export default ImportForm;
