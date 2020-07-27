/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  DeleteButton,
  Icon,
  PullRequest,
  PullRequestListDetail,
  PullRequestUsername,
  StyledStar,
  SubmittedWrapper,
  WatchList,
  WatchListItem,
} from './styledComponents';

const CloseCircleIcon = iconDictionary('closeCircle');

const PullRequestListComponent = ({
  handleDeletePullRequest,
  handleRedirect,
  isSignedIn,
  route,
  tableData: { activeUserPullRequests, pullRequests },
}) => (
  <WatchList>
    {pullRequests.map(
      ({ htmlUrl, rep, title, username, userId, pullRequestId }, index) => (
        <WatchListItem key={`list-item-${index}`}>
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
        </WatchListItem>
      ),
    )}
  </WatchList>
);

PullRequestListComponent.propTypes = {
  handleDeletePullRequest: T.func.isRequired,
  handleRedirect: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  route: T.string.isRequired,
  tableData: T.object.isRequired,
};

export default PullRequestListComponent;
