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
  disabled,
  dispatchOpenModal,
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
        return null;
      }}
    >
      {PullRequestIcon}
      <LabelWrapper>Submit PR</LabelWrapper>
    </StyledPullRequestButton>
    <ValueWrapper>{pullRequests.length}</ValueWrapper>
  </PullRequestButtonContainer>
);

PullRequestButton.propTypes = {
  disabled: T.bool,
  dispatchOpenModal: T.func,
  isSignedIn: T.bool,
  pullRequests: T.array,
};

export default PullRequestButton;
