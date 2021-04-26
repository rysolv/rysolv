import React, { Fragment } from 'react';
import T from 'prop-types';

import AsyncRender from 'components/AsyncRender';

import ImportPullRequestCard from './ImportPullRequestCard';
import { StyledHeader } from '../styledComponents';
import { TextWrapper, UserPullRequestsContainer } from './styledComponents';

const UserPullRequests = ({
  handleImport,
  handleInputChange,
  userPullRequests,
  userPullRequestsLoading,
}) => {
  const UserPullRequestList =
    userPullRequests &&
    userPullRequests.map(
      ({ exists, htmlUrl, modifiedDate, pullNumber, title }) => (
        <ImportPullRequestCard
          exists={exists}
          handleImport={handleImport}
          handleInputChange={handleInputChange}
          htmlUrl={htmlUrl}
          key={htmlUrl}
          modifiedDate={modifiedDate}
          pullNumber={pullNumber}
          title={title}
        />
      ),
    );

  const NoPullRequestsMessage = (
    <TextWrapper>No pull requests found for this issue.</TextWrapper>
  );

  const ViewToRender =
    userPullRequests && userPullRequests.length > 0
      ? UserPullRequestList
      : NoPullRequestsMessage;

  return (
    <Fragment>
      <StyledHeader>My Pull Requests</StyledHeader>
      <AsyncRender
        component={() => (
          <UserPullRequestsContainer>{ViewToRender}</UserPullRequestsContainer>
        )}
        loading={userPullRequestsLoading}
        propsToPassDown={{
          handleInputChange,
          userPullRequests,
        }}
      />
    </Fragment>
  );
};

UserPullRequests.propTypes = {
  handleImport: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  userPullRequests: T.array.isRequired,
  userPullRequestsLoading: T.bool.isRequired,
};

export default UserPullRequests;
