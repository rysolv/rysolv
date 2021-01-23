import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  ButtonGroup,
  Checkbox,
  Divider,
  PullNumberWrapper,
  PullRequestContainer,
  PullRequestInfo,
  StatusWrapper,
  StyledHeader,
  StyledItem,
  StyledLabel,
  StyledPrimaryAsyncButton,
  StyledSecondayButton,
  StyledSubHeader,
} from './styledComponents';
import { StyledErrorSuccessBanner } from '../styledComponents';

const CheckIcon = iconDictionary('check');
const CloseIcon = iconDictionary('close');

const VerifyForm = ({
  alerts: { error },
  dispatchHandleStep,
  handleClearAlerts,
  handleSubmit,
  importData: {
    githubUsername,
    htmlUrl,
    mergeable,
    mergeableState,
    open,
    pullNumber,
    title,
  },
  loading,
}) => {
  const handleBack = () => {
    dispatchHandleStep({ step: 1 });
    handleClearAlerts();
  };
  const isMergeable = mergeable.value;
  const haveTestsPassed = mergeableState.value !== 'unstable';
  const status = open.value ? 'open' : 'closed';
  return (
    <Fragment>
      <StyledHeader>Verify</StyledHeader>
      <StyledErrorSuccessBanner error={error} onClose={handleClearAlerts} />
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
            <StatusWrapper>{status}</StatusWrapper>
          </StyledItem>
          <StyledItem>
            <StyledLabel>Mergeable</StyledLabel>
            <Checkbox hasError={isMergeable}>
              {isMergeable ? CheckIcon : CloseIcon}
            </Checkbox>
          </StyledItem>
          <StyledItem>
            <StyledLabel>Tests Passed</StyledLabel>
            <Checkbox hasError={haveTestsPassed}>
              {haveTestsPassed ? CheckIcon : CloseIcon}
            </Checkbox>
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
  alerts: T.object,
  dispatchHandleStep: T.func,
  handleClearAlerts: T.func,
  handleSubmit: T.func,
  importData: T.object,
  loading: T.bool,
};

export default VerifyForm;
