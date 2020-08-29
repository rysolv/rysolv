import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  DeleteButton,
  Icon,
  ListContainer,
  ListItemWrapper,
  PullRequest,
  PullRequestListDetail,
  PullRequestUsername,
  StyledCoin,
  SubmittedWrapper,
} from './styledComponents';

const CloseCircleIcon = iconDictionary('closeCircle');

const PullRequestListComponent = ({
  handleClose,
  handleDeletePullRequest,
  isSignedIn,
  route,
  tableData: { activeUserPullRequests, pullRequests },
}) => (
  <ListContainer>
    {pullRequests.map(
      ({ htmlUrl, pullRequestId, rep, title, userId, username }) => (
        <ListItemWrapper key={`list-item-${pullRequestId}`}>
          <PullRequestListDetail>
            <PullRequest href={htmlUrl} target="_blank">
              {title}
            </PullRequest>
            <SubmittedWrapper>
              submitted by{' '}
              <PullRequestUsername
                onClick={handleClose}
                to={`${route}/${userId}`}
              >
                {username} (<StyledCoin /> {rep})
              </PullRequestUsername>
            </SubmittedWrapper>
          </PullRequestListDetail>
          <ConditionalRender
            Component={
              <DeleteButton
                onClick={() =>
                  handleDeletePullRequest({ pullRequestId, userId })
                }
              >
                <Icon>{CloseCircleIcon}</Icon>Cancel
              </DeleteButton>
            }
            shouldRender={
              isSignedIn &&
              activeUserPullRequests &&
              activeUserPullRequests.includes(pullRequestId)
            }
          />
        </ListItemWrapper>
      ),
    )}
  </ListContainer>
);

PullRequestListComponent.propTypes = {
  handleClose: T.func.isRequired,
  handleDeletePullRequest: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  route: T.string.isRequired,
  tableData: T.object.isRequired,
};

export default PullRequestListComponent;
