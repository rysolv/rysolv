import React, { Fragment } from 'react';
import T from 'prop-types';

import {
  ButtonGroup,
  Divider,
  PullNumberWrapper,
  PullRequestContainer,
  PullRequestInfo,
  StatusWrapper,
  StyledCheckbox,
  StyledErrorSuccessBanner,
  StyledHeader,
  StyledItem,
  StyledLabel,
  StyledPrimaryAsyncButton,
  StyledSecondayButton,
  StyledSubHeader,
} from './styledComponents';

const VerifyForm = ({
  dispatchHandleStep,
  error,
  handleClearError,
  handleSubmit,
  importData: {
    githubUsername,
    htmlUrl,
    mergeable,
    mergeableState,
    pullNumber,
    status,
    title,
  },
  loading,
}) => {
  const errorToDisplay = error ? { message: error } : false;
  const handleBack = () => {
    dispatchHandleStep({ step: 1 });
    handleClearError();
  };
  return (
    <Fragment>
      <StyledHeader>Verify</StyledHeader>
      <StyledErrorSuccessBanner
        error={errorToDisplay}
        onClose={handleClearError}
      />
      <PullRequestContainer>
        <StyledSubHeader>General</StyledSubHeader>
        <Divider />
        <PullRequestInfo>
          <StyledItem>
            <StyledLabel>Title</StyledLabel>
            <div>
              {title.value}
              <PullNumberWrapper> #{pullNumber.value}</PullNumberWrapper>
            </div>
          </StyledItem>
          <StyledItem>
            <StyledLabel>Url</StyledLabel>
            {htmlUrl.value}
          </StyledItem>
          <StyledItem>
            <StyledLabel>Posted by</StyledLabel>
            {githubUsername.value}
          </StyledItem>
        </PullRequestInfo>
        <StyledSubHeader>Mergeable Status</StyledSubHeader>
        <Divider />
        <PullRequestInfo>
          <StyledItem>
            <StyledLabel>Status</StyledLabel>
            <StatusWrapper>{status.value}</StatusWrapper>
          </StyledItem>
          <StyledItem>
            <StyledLabel>Mergeable</StyledLabel>
            <StyledCheckbox checked disabled hasError={!mergeable.value} />
          </StyledItem>
          <StyledItem>
            <StyledLabel>Tests Passed</StyledLabel>
            <StyledCheckbox
              disabled
              checked
              hasError={mergeableState.value === 'unstable'}
            />
          </StyledItem>
        </PullRequestInfo>
      </PullRequestContainer>
      <ButtonGroup>
        <StyledSecondayButton label="Back" onClick={handleBack} />
        <StyledPrimaryAsyncButton
          label="Submit"
          loading={loading}
          onClick={() => handleSubmit()}
        />
      </ButtonGroup>
    </Fragment>
  );
};

VerifyForm.propTypes = {
  dispatchHandleStep: T.func,
  error: T.string,
  handleClearError: T.func,
  handleSubmit: T.func,
  importData: T.object,
  loading: T.bool,
};

export default VerifyForm;
