import React from 'react';
import T from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { ConditionalRender } from 'components/base_ui';

import CompanyContributorsTab from './CompanyContributorsTab';
import CompanyIssuesTab from './CompanyIssuesTab';
import ContributorsSearchHeader from './ContributorsSearchHeader';
import IssuesSearchHeader from './IssuesSearchHeader';
import { StyledPaper } from './styledComponents';

const CompanyDetailTabs = ({
  contributors,
  disabledContributors,
  disabledIssues,
  handleInputChange,
  handleNav,
  handleSearchContributors,
  handleSearchIssues,
  issues,
  search,
}) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <StyledPaper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Issues" />
        <Tab label="Contributors" />
      </Tabs>
      <ConditionalRender
        Component={
          <ContributorsSearchHeader
            disabled={disabledContributors}
            handleInputChange={handleInputChange}
            handleSearch={handleSearchContributors}
            search={search}
          />
        }
        FallbackComponent={
          <IssuesSearchHeader
            disabled={disabledIssues}
            handleInputChange={handleInputChange}
            handleSearch={handleSearchIssues}
            search={search}
          />
        }
        shouldRender={!!value}
      />
      <ConditionalRender
        Component={
          <CompanyContributorsTab
            contributors={contributors}
            handleNav={handleNav}
          />
        }
        FallbackComponent={<CompanyIssuesTab issues={issues} />}
        shouldRender={!!value}
      />
    </StyledPaper>
  );
};

CompanyDetailTabs.propTypes = {
  contributors: T.array,
  disabledContributors: T.bool,
  disabledIssues: T.bool,
  handleInputChange: T.func,
  handleNav: T.func,
  handleSearchContributors: T.func,
  handleSearchIssues: T.func,
  issues: T.array,
  search: T.object,
};

export default CompanyDetailTabs;
