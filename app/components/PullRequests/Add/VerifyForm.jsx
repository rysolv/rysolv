import React from 'react';
import T from 'prop-types';

import {
  ButtonContainer,
  PullRequestCard,
  StyledItem,
  StyledLabel,
  VerifyForm,
} from './styledComponents';

const ImportPullRequest = ({
  dispatchHandleStep,
  handleSubmit,
  importData,
}) => {
  const {
    githubUsername,
    htmlUrl,
    mergeable,
    merged,
    open,
    pullNumber,
    status,
    title,
  } = importData;
  return (
    <VerifyForm>
      <h3>VERIFY</h3>

      <PullRequestCard>
        <StyledItem>
          <StyledLabel>Title: </StyledLabel>
          {title.value}
        </StyledItem>

        <StyledItem>
          <StyledLabel>Status: </StyledLabel>
          {status.value}
        </StyledItem>

        <StyledItem>
          <StyledLabel>URL: </StyledLabel>
          {htmlUrl.value}
        </StyledItem>

        <StyledItem>
          <StyledLabel>Github Username: </StyledLabel>
          {githubUsername.value}
        </StyledItem>

        <StyledItem>
          <StyledLabel>Mergeable: </StyledLabel>
          {mergeable.value ? 'true' : false}
        </StyledItem>

        <StyledItem>
          <StyledLabel>Merged: </StyledLabel>
          {merged.value ? 'true' : 'false'}
        </StyledItem>

        <StyledItem>
          <StyledLabel>Open: </StyledLabel>
          {open.value ? 'true' : 'false'}
        </StyledItem>

        <StyledItem>
          <StyledLabel>Pull Number: </StyledLabel>
          {pullNumber.value}
        </StyledItem>
      </PullRequestCard>

      <ButtonContainer>
        <button type="button" onClick={() => dispatchHandleStep({ step: 1 })}>
          Cancel
        </button>
        <button type="button" onClick={() => handleSubmit()}>
          Submit
        </button>
      </ButtonContainer>
    </VerifyForm>
  );
};

ImportPullRequest.propTypes = {
  dispatchHandleStep: T.func,
  handleSubmit: T.func,
  importData: T.object,
};

export default ImportPullRequest;
