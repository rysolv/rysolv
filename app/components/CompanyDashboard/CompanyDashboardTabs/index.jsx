import React from 'react';
import T from 'prop-types';

import { dashboardTabsDictionary } from './constants';
import { StyledTab, StyledTabs } from './styledComponents';

const CompanyDashboardTabs = ({
  candidateCount: { applied, recommended, saved },
  dispatchChangeFilter,
  filter: { step },
}) => (
  <StyledTabs
    classes={{ indicator: 'indicator' }}
    textColor="primary"
    value={dashboardTabsDictionary[step]}
    variant="scrollable"
  >
    <StyledTab
      classes={{ selected: 'selected' }}
      label={applied ? `Applied (${applied})` : 'Applied'}
      onClick={() => dispatchChangeFilter({ field: 'step', value: 'applied' })}
    />
    <StyledTab
      classes={{ selected: 'selected' }}
      label={recommended ? `Recommended (${recommended})` : 'Recommended'}
      onClick={() => dispatchChangeFilter({ field: 'step', value: 'all' })}
    />
    <StyledTab
      classes={{ selected: 'selected' }}
      label={saved ? `Shortlisted (${saved})` : 'Shortlisted'}
      onClick={() => dispatchChangeFilter({ field: 'step', value: 'saved' })}
    />
  </StyledTabs>
);

CompanyDashboardTabs.propTypes = {
  candidateCount: T.object.isRequired,
  dispatchChangeFilter: T.func.isRequired,
  filter: T.object.isRequired,
};

export default CompanyDashboardTabs;
