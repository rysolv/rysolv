import React from 'react';
import T from 'prop-types';

import UserPullRequests from './UserPullRequests';
import {
  ButtonGroup,
  ImportFormContainer,
  ImportUrlWrapper,
  StyledBaseTextInputWithAdornment,
  StyledErrorSuccessBanner,
  StyledHeader,
  StyledPrimaryAsyncButton,
  StyledSecondayButton,
} from './styledComponents';

const ImportForm = ({
  alerts: { error },
  handleClearAlerts,
  handleClose,
  handleImport,
  handleInputChange,
  importData,
  loading,
  userPullRequests,
  userPullRequestsLoading,
}) => {
  const { importUrl } = importData;
  const enabled = !!importUrl.value;
  const handleChange = e => {
    handleInputChange({
      field: 'importUrl',
      form: 'importData',
      value: e.target.value,
    });
  };
  const handleKeypress = ({ key }) => {
    if (key === 'Enter' && enabled) {
      handleImport();
    }
  };
  return (
    <ImportFormContainer onKeyPress={e => handleKeypress(e)} tabIndex="0">
      <StyledHeader>Import Pull Request</StyledHeader>
      <StyledErrorSuccessBanner error={error} onClose={handleClearAlerts} />
      <ImportUrlWrapper>
        <StyledBaseTextInputWithAdornment
          disabled={userPullRequestsLoading}
          name="url"
          onChange={handleChange}
          placeholder="https://github.com/rysolv/rysolv/pull/1"
          value={importUrl.value}
        />
      </ImportUrlWrapper>
      <UserPullRequests
        handleImport={handleImport}
        handleInputChange={handleInputChange}
        userPullRequests={userPullRequests}
        userPullRequestsLoading={userPullRequestsLoading}
      />
      <ButtonGroup>
        <StyledSecondayButton label="Cancel" onClick={handleClose} />
        <StyledPrimaryAsyncButton
          disabled={!enabled}
          label="Import"
          loading={loading}
          onClick={handleImport}
        />
      </ButtonGroup>
    </ImportFormContainer>
  );
};

ImportForm.propTypes = {
  alerts: T.object.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleClose: T.func.isRequired,
  handleImport: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  importData: T.object.isRequired,
  loading: T.bool.isRequired,
  userPullRequests: T.array.isRequired,
  userPullRequestsLoading: T.bool.isRequired,
};

export default ImportForm;
