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
  StyledStar,
  SubmittedWrapper,
} from './styledComponents';

const CloseCircleIcon = iconDictionary('closeCircle');

const PullRequestListComponent = ({
  handleDeletePullRequest,
  handleRedirect,
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
                href={`${route}/${userId}`}
                onClick={() => handleRedirect(`${route}/${userId}`)}
              >
                {username} ( <StyledStar /> {rep})
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
              !!activeUserPullRequests.filter(id => pullRequestId === id)
            }
          />
        </ListItemWrapper>
      ),
    )}
  </ListContainer>
);

PullRequestListComponent.propTypes = {
  handleDeletePullRequest: T.func.isRequired,
  handleRedirect: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  route: T.string.isRequired,
  tableData: T.object.isRequired,
};

export default PullRequestListComponent;
