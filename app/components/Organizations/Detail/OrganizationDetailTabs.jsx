import React from 'react';
import T from 'prop-types';
import Tabs from '@material-ui/core/Tabs';

import { ConditionalRender } from 'components/base_ui';

import OrganizationContributorsTab from './Contributors/OrganizationContributorsTab';
import OrganizationIssuesTab from './Issues/OrganizationIssuesTab';
import ContributorsSearchHeader from './Contributors/ContributorsSearchHeader';
import IssuesSearchHeader from './Issues/IssuesSearchHeader';
import { StyledPaper, StyledTab } from './styledComponents';

const OrganizationDetailTabs = ({
  contributors,
  filterValues,
  handleInputChange,
  handleNav,
  handleUpvote,
  issues,
}) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { issues: issuesFilter } = filterValues;
  return (
    <StyledPaper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <StyledTab label="Issues" />
        <StyledTab label="Contributors" />
      </Tabs>
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
        Component={
          <OrganizationDetailTabsContributorsTab
            contributors={contributors}
            handleNav={handleNav}
          />
        }
        FallbackComponent={
          <OrganizationDetailTabsIssuesTab
            issues={issues}
            handleNav={handleNav}
            handleUpvote={handleUpvote}
          />
        }
        shouldRender={!!value}
      />
    </StyledPaper>
  );
};

OrganizationDetailTabs.propTypes = {
  contributors: T.array,
  filterValues: T.object.isRequired,
  handleInputChange: T.func,
  handleNav: T.func,
  handleUpvote: T.func,
  issues: T.array,
};

export default OrganizationDetailTabs;
