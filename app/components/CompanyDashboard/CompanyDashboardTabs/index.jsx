import React from 'react';
import T from 'prop-types';

import { dashboardTabsDictionary } from './constants';
import { StyledTab, StyledTabs } from './styledComponents';

const CompanyDashboardTabs = ({ dispatchChangeFilter, filter: { step } }) => (
  <StyledTabs
    classes={{ indicator: 'indicator' }}
    textColor="primary"
    value={dashboardTabsDictionary[step] || 0}
    variant="scrollable"
  >
    <StyledTab
      classes={{ selected: 'selected' }}
      label="Applied"
      onClick={() => dispatchChangeFilter({ field: 'step', value: 'applied' })}
    />
    <StyledTab
      classes={{ selected: 'selected' }}
      label="Recommended"
      onClick={() => dispatchChangeFilter({ field: 'step', value: 'all' })}
    />
    <StyledTab
      classes={{ selected: 'selected' }}
      label="Shortlisted"
      onClick={() => dispatchChangeFilter({ field: 'step', value: 'saved' })}
    />
  </StyledTabs>
);

CompanyDashboardTabs.propTypes = {
  dispatchChangeFilter: T.func.isRequired,
  filter: T.object.isRequired,
};

export default CompanyDashboardTabs;
