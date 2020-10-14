import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  LabelWrapper,
  PullRequestButtonContainer,
  StyledPullRequestButton,
  ValueWrapper,
} from './styledComponents';

const PullRequestIcon = iconDictionary('pullRequest');

const PullRequestButton = ({
  activeUserPullRequests,
  disabled,
  dispatchFetchPullRequestList,
  dispatchOpenIssueModal,
  dispatchOpenModal,
  isGithubVerified,
  isSignedIn,
  issueId,
  pullRequests,
}) => (
  <PullRequestButtonContainer>
    <StyledPullRequestButton
      disabled={disabled}
      onClick={() => {
        if (!isSignedIn) {
          return dispatchOpenModal({ modalState: 'signIn' });
        }
        if (!isGithubVerified) {
          return dispatchOpenModal({ modalState: 'verifyAccount' });
        }
        return dispatchOpenIssueModal({ modalState: 'addPullRequest' });
      }}
    >
      {PullRequestIcon}
      <LabelWrapper>Submit PR</LabelWrapper>
    </StyledPullRequestButton>
    <ValueWrapper
      onClick={() =>
        dispatchFetchPullRequestList({
          activeUserPullRequests,
          issueId,
          modalState: 'pullRequestList',
        })
      }
    >
      {pullRequests}
    </ValueWrapper>
  </PullRequestButtonContainer>
);

PullRequestButton.propTypes = {
  activeUserPullRequests: T.array,
  disabled: T.bool.isRequired,
  dispatchFetchPullRequestList: T.func.isRequired,
  dispatchOpenIssueModal: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  isGithubVerified: T.bool,
  isSignedIn: T.bool.isRequired,
  issueId: T.string.isRequired,
  pullRequests: T.number.isRequired,
};

export default PullRequestButton;
