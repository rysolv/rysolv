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
  handleInputChange,
  handleNav,
  issues,
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
          <ContributorsSearchHeader handleInputChange={handleInputChange} />
        }
        FallbackComponent={
          <IssuesSearchHeader handleInputChange={handleInputChange} />
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
  handleInputChange: T.func,
  handleNav: T.func,
  issues: T.array,
};

export default CompanyDetailTabs;
