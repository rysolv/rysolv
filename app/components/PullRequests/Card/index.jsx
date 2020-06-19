import React from 'react';
import T from 'prop-types';

import {
  PullRequestCardWrapper,
  StyledItem,
  StyledLabel,
} from './styledComponents';

const PullRequestCard = ({ data }) => {
  const cardDiv = data.map(
    ({
      createdDate,
      githubUsername,
      htmlUrl,
      issueId,
      issueName,
      modifiedDate,
      open,
      pullRequestId,
      status,
      title,
      userId,
    }) => (
      <PullRequestCardWrapper key={pullRequestId}>
        <StyledItem>
          <StyledLabel>Created date: </StyledLabel>
          {createdDate}
        </StyledItem>
        <StyledItem>
          <StyledLabel>Github Username: </StyledLabel>
          {githubUsername}
        </StyledItem>
        <StyledItem>
          <StyledLabel>Html URL: </StyledLabel>
          {htmlUrl}
        </StyledItem>
        <StyledItem>
          <StyledLabel>Issue ID: </StyledLabel>
          {issueId}
        </StyledItem>
        <StyledItem>
          <StyledLabel>Issue Name: </StyledLabel>
          {issueName}
        </StyledItem>
        <StyledItem>
          <StyledLabel>Modified Date: </StyledLabel>
          {modifiedDate}
        </StyledItem>
        <StyledItem>
          <StyledLabel>Open: </StyledLabel>
          {open ? 'true' : 'false'}
        </StyledItem>
        <StyledItem>
          <StyledLabel>PullRequest ID: </StyledLabel>
          {pullRequestId}
        </StyledItem>
        <StyledItem>
          <StyledLabel>Status: </StyledLabel>
          {status}
        </StyledItem>
        <StyledItem>
          <StyledLabel>Title: </StyledLabel>
          {title}
        </StyledItem>
        <StyledItem>
          <StyledLabel>UserId: </StyledLabel>
          {userId}
        </StyledItem>
      </PullRequestCardWrapper>
    ),
  );
  return cardDiv;
};

PullRequestCard.propTypes = {
  data: T.array.isRequired,
};

export default PullRequestCard;
