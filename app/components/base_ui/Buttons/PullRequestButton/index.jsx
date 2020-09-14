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
          idArray: pullRequests,
          modalState: 'pullRequestList',
        })
      }
    >
      {pullRequests.length}
    </ValueWrapper>
  </PullRequestButtonContainer>
);

PullRequestButton.propTypes = {
  activeUserPullRequests: T.array,
  disabled: T.bool,
  dispatchFetchPullRequestList: T.func,
  dispatchOpenIssueModal: T.func,
  dispatchOpenModal: T.func,
  isGithubVerified: T.bool,
  isSignedIn: T.bool,
  pullRequests: T.array,
};

export default PullRequestButton;
