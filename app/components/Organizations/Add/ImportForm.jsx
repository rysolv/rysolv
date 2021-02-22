import React, { useEffect } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import UserRepos from './UserRepos';

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
  importRepoLoading,
  isGithubVerified,
  repoData: { autoImportUrl, importUrl },
  useRepos,
  userReposLoading,
}) => {
  useEffect(() => document.getElementById('repoImport').focus(), []);

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
      form: 'repoData',
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
      id="repoImport"
      onKeyPress={e => handleKeypress(e)}
      tabIndex="0"
    >
      Import GitHub Repo
      <br />
      <StyledBaseTextInputWithAdornment
        adornmentComponent={SearchIcon}
        disabled={importRepoLoading}
        error={!!importUrl.error}
        helperText={importUrl.error || ''}
        name="url"
        onChange={onChangeHandler}
        onClick={handleSubmit}
        placeholder="https://github.com/rysolv/rysolv"
        position="end"
        value={importUrl.value}
      />
      <StyledImportError>
        {importError.error ? importError.message : null}
      </StyledImportError>
      <ConditionalRender
        Component={UserRepos}
        FallbackComponent={UnauthenticatedMessage}
        propsToPassDown={{
          handleInputChange,
          useRepos,
          userReposLoading,
        }}
        shouldRender={isGithubVerified}
      />
      {/* or
      <StyledLabel
        onClick={() =>
          handleIncrementStep({ step: 2, view: 'addOrganization' })
        }
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
  importRepoLoading: T.bool,
  isGithubVerified: T.bool,
  repoData: T.object,
  useRepos: T.array,
  userReposLoading: T.bool,
};

export default ImportForm;
