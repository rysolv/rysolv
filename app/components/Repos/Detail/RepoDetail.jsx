import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import { ContributorsSearchHeader, RepoContributors } from './Contributors';
import { IssuesSearchHeader, RepoIssues } from './Issues';
import {
  ComponentContainer,
  EmptyMessageComponent,
  RepoDetailContainer,
  StyledTitle,
} from './styledComponents';

const RepoDetail = ({
  activeUser,
  contributors,
  dispatchOpenModal,
  filterValues,
  handleInputChange,
  handleNav,
  handleUpvote,
  isSignedIn,
  issues,
}) => {
  const { issues: issuesFilter } = filterValues;

  const RepoContributorsComponent = () => (
    <ConditionalRender
      Component={
        <RepoContributors contributors={contributors} handleNav={handleNav} />
      }
      FallbackComponent={
        <EmptyMessageComponent>
          No contributors match the search terms.
        </EmptyMessageComponent>
      }
      shouldRender={!!contributors.length}
    />
  );

  const RepoIssuesComponent = () => (
    <ConditionalRender
      Component={
        <RepoIssues
          activeUser={activeUser}
          dispatchOpenModal={dispatchOpenModal}
          handleNav={handleNav}
          handleUpvote={handleUpvote}
          isSignedIn={isSignedIn}
          issues={issues}
        />
      }
      FallbackComponent={
        <EmptyMessageComponent>
          No issues match the search terms.
        </EmptyMessageComponent>
      }
      shouldRender={!!issues.length}
    />
  );

  return (
    <RepoDetailContainer>
      <ComponentContainer>
        <StyledTitle>Issues</StyledTitle>
        <IssuesSearchHeader
          handleInputChange={handleInputChange}
          issuesFilter={issuesFilter}
        />
        <RepoIssuesComponent />
      </ComponentContainer>
      <ComponentContainer hasPadding>
        <StyledTitle>Contributors</StyledTitle>
        <ContributorsSearchHeader handleInputChange={handleInputChange} />
        <RepoContributorsComponent />
      </ComponentContainer>
    </RepoDetailContainer>
  );
};

RepoDetail.propTypes = {
  activeUser: T.object,
  contributors: T.array,
  dispatchOpenModal: T.func,
  filterValues: T.object.isRequired,
  handleInputChange: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  isSignedIn: T.bool,
  issues: T.array,
};

export default RepoDetail;
