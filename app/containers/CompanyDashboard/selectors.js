/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectCompanyDashboardDomain = state =>
  state.companyDashboard || initialState;

const makeSelectCompanyDashboardActiveStep = () =>
  createSelector(
    makeSelectCompanyDashboard('companyMatches'),
    makeSelectCompanyDashboard('selectedPosition'),
    (companyMatches, selectedPosition) =>
      companyMatches[selectedPosition].reduce(
        (acc, { isSaved, isInterviewed, isHired }) => {
          if (acc < 3 && isHired) acc = 3;
          if (acc < 2 && isInterviewed) acc = 2;
          if (acc < 1 && isSaved) acc = 1;
          return acc;
        },
        0,
      ),
  );

const makeSelectCompanyDashboardCandidates = () =>
  createSelector(
    makeSelectCompanyDashboard('companyMatches'),
    makeSelectCompanyDashboard('selectedPosition'),
    (companyMatches, selectedPosition) =>
      companyMatches[selectedPosition].map(
        ({ firstName, lastName, languages, ...restProps }) => ({
          languages: languages.slice(0, 3),
          name: `${firstName.charAt(0)}. ${lastName.charAt(0)}.`,
          ...restProps,
        }),
      ),
  );

const makeSelectCompanyDashboardPositions = () =>
  createSelector(
    makeSelectCompanyDashboard('companyMatches'),
    companyMatches => Object.keys(companyMatches),
  );

const makeSelectCompanyDashboard = prop =>
  createSelector(
    selectCompanyDashboardDomain,
    substate => substate[prop],
  );

export default selectCompanyDashboardDomain;
export {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardActiveStep,
  makeSelectCompanyDashboardCandidates,
  makeSelectCompanyDashboardPositions,
};
