/* eslint-disable no-new */
import React from 'react';
import T from 'prop-types';

import {
  FallBackCard,
  IconWrapper,
  LinkWrapper,
  LoadingCard,
  StyledParagraph,
  StyledSubParagraph,
} from './styledComponents';

const CognitoFallback = ({ isSignedIn }) => (
  <LoadingCard>
    <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />

    <StyledParagraph>
      No commit data available
      {isSignedIn && (
        <StyledSubParagraph>
          <LinkWrapper to="/settings">Connect a Github account</LinkWrapper>
          complete your profile.
        </StyledSubParagraph>
      )}
    </StyledParagraph>
  </LoadingCard>
);

const LoadingFallback = ({ isSignedIn }) => (
  <LoadingCard>
    <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />
    <StyledParagraph>Crunching the numbers</StyledParagraph>
    <StyledSubParagraph>
      We are crunching the numbers and building some fancy charts.
    </StyledSubParagraph>
    {isSignedIn && (
      <StyledSubParagraph>
        You will receive an email when your profile is complete.
      </StyledSubParagraph>
    )}
  </LoadingCard>
);

const PullRequestFallback = () => (
  <FallBackCard>No pull requests found.</FallBackCard>
);

const RepoFallback = () => <FallBackCard>No repos found.</FallBackCard>;

CognitoFallback.propTypes = {
  isSignedIn: T.bool,
};

LoadingFallback.propTypes = {
  isSignedIn: T.bool,
};

export { CognitoFallback, LoadingFallback, PullRequestFallback, RepoFallback };
