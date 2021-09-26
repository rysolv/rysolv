/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

import { filterCandidates } from './helpers';
import { initialState } from './reducer';

const selectCompanyDashboardDomain = state =>
  state.companyDashboard || initialState;

const makeSelectCompanyDashboardCandidates = () =>
  createSelector(
    makeSelectCompanyDashboard('companyMatches'),
    makeSelectCompanyDashboard('filter'),
    makeSelectCompanyDashboard('selectedPosition'),
    (companyMatches, filter, selectedPosition) => {
      if (!isEmpty(companyMatches) && !!selectedPosition) {
        const { candidates } = companyMatches.find(
          ({ position: { id } }) => id === selectedPosition,
        );
        const filteredCandidates = filterCandidates(candidates, filter);
        return filteredCandidates.map(
          ({ firstName, lastName, languages, ...restProps }) => ({
            languages: languages.slice(0, 3),
            name: `${firstName.charAt(0)}. ${lastName.charAt(0)}.`,
            ...restProps,
          }),
        );
      }
      return [];
    },
  );

const makeSelectCompanyDashboardPositions = () =>
  createSelector(
    makeSelectCompanyDashboard('companyMatches'),
    companyMatches => companyMatches.map(({ position }) => position),
  );

const makeSelectCompanyDashboard = prop =>
  createSelector(
    selectCompanyDashboardDomain,
    substate => substate[prop],
  );

export default selectCompanyDashboardDomain;
export {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardCandidates,
  makeSelectCompanyDashboardPositions,
};
