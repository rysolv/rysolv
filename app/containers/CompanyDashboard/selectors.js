import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectCompanyDashboardDomain = state =>
  state.companyDashboard || initialState;

const makeSelectCompanyDashboardCandidates = () =>
  createSelector(
    makeSelectCompanyDashboard('candidates'),
    candidates =>
      candidates.map(({ firstName, lastName, languages, ...restProps }) => ({
        languages: languages.slice(0, 3),
        name: `${firstName.charAt(0)}. ${lastName.charAt(0)}.`,
        ...restProps,
      })),
  );

const makeSelectCompanyDashboard = prop =>
  createSelector(
    selectCompanyDashboardDomain,
    substate => substate[prop],
  );

export default selectCompanyDashboardDomain;
export { makeSelectCompanyDashboard, makeSelectCompanyDashboardCandidates };
