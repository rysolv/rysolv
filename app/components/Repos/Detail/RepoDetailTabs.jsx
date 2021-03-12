import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import ContributorsSearchHeader from './Contributors/ContributorsSearchHeader';
import IssuesSearchHeader from './Issues/IssuesSearchHeader';
import RepoContributorsTab from './Contributors/RepoContributorsTab';
import RepoIssuesTab from './Issues/RepoIssuesTab';
import {
  EmptyMessageComponent,
  StyledPaper,
  StyledTab,
  StyledTabs,
} from './styledComponents';

const RepoDetailTabs = ({
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
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { issues: issuesFilter } = filterValues;

  const RepoContributorsTabComponent = (
    <ConditionalRender
      Component={
        <RepoContributorsTab
          contributors={contributors}
          handleNav={handleNav}
        />
      }
      FallbackComponent={
        <EmptyMessageComponent>
          No contributors match the search terms.
        </EmptyMessageComponent>
      }
      shouldRender={!!contributors.length}
    />
  );

  const RepoIssuesTabComponent = (
    <ConditionalRender
      Component={
        <RepoIssuesTab
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
    <StyledPaper>
      <StyledTabs
        classes={{ indicator: 'indicator' }}
        onChange={handleChange}
        textColor="primary"
        value={value}
      >
        <StyledTab classes={{ selected: 'selected' }} label="Issues" />
        <StyledTab classes={{ selected: 'selected' }} label="Contributors" />
      </StyledTabs>
      <ConditionalRender
        Component={
          <ContributorsSearchHeader handleInputChange={handleInputChange} />
        }
        FallbackComponent={
          <IssuesSearchHeader
            handleInputChange={handleInputChange}
            issuesFilter={issuesFilter}
          />
        }
        shouldRender={!!value}
      />
      <ConditionalRender
        Component={RepoContributorsTabComponent}
        FallbackComponent={RepoIssuesTabComponent}
        shouldRender={!!value}
      />
    </StyledPaper>
  );
};

RepoDetailTabs.propTypes = {
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

export default RepoDetailTabs;
