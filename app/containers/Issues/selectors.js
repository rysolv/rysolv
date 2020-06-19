import { createSelector } from 'reselect';
import { omit } from 'lodash';

import { filterIssues, organizeIssues, searchIssues } from './helpers';
import { initialState } from './reducer';

const selectIssuesDomain = state => state.issues || initialState;

const makeSelectIssues = prop =>
  createSelector(
    selectIssuesDomain,
    substate => substate[prop],
  );

const makeSelectIssuesDisabled = () =>
  createSelector(
    makeSelectIssues('issueData'),
    issueData => {
      const tempData = omit(issueData, ['importUrl']);
      return Object.keys(tempData).every(item => tempData[item].value !== '');
    },
  );

const makeSelectIssuesError = prop =>
  createSelector(
    makeSelectIssues('error'),
    error => error[prop],
  );

const makeSelectIssuesLoading = prop =>
  createSelector(
    makeSelectIssues('loading'),
    loading => loading[prop],
  );

const makeSelectOrganizationsDisabled = () =>
  createSelector(
    makeSelectIssues('organizationData'),
    data => {
      const tempData = omit(data, [
        'organizationId',
        'importUrl',
        'organizationLogo',
      ]);
      return Object.keys(tempData).every(item => tempData[item].value !== '');
    },
  );

const makeSelectIssueDetail = prop =>
  createSelector(
    selectIssuesDomain,
    substate => substate[prop],
  );

const makeSelectIssueDetailError = prop =>
  createSelector(
    makeSelectIssueDetail('error'),
    error => error[prop],
  );

const makeSelectIssuesFiltered = () =>
  createSelector(
    makeSelectIssues('issues'),
    makeSelectIssues('filter'),
    makeSelectIssues('search'),
    (issues, filter, { overviewInput }) => {
      const { overview: overviewFilter } = filter;
      const searchedIssues = searchIssues(issues, overviewInput);
      const organizedIssues = organizeIssues(searchedIssues, overviewFilter);
      const filteredIssues = filterIssues(organizedIssues, filter);
      return filteredIssues;
    },
  );
const makeSelectIssueDetailLoading = prop =>
  createSelector(
    makeSelectIssueDetail('loading'),
    loading => loading[prop],
  );

const makeSelectIssuesRequestBody = () =>
  createSelector(
    makeSelectIssues('issueData'),
    makeSelectIssues('organizationData'),
    (issueData, organizationData) => {
      const formData = { ...issueData, ...organizationData };
      return Object.keys(formData).reduce((acc, field) => {
        acc[field] = formData[field].value;
        return acc;
      }, {});
    },
  );

const makeSelectIssuesSearchDisabled = () =>
  createSelector(
    makeSelectIssues('search'),
    ({ searchInput }) => searchInput.value === '',
  );

const makeSelectIssuesStep = prop =>
  createSelector(
    makeSelectIssues('step'),
    step => step[prop],
  );

export default selectIssuesDomain;
export {
  makeSelectIssueDetail,
  makeSelectIssueDetailError,
  makeSelectIssueDetailLoading,
  makeSelectIssues,
  makeSelectIssuesDisabled,
  makeSelectIssuesError,
  makeSelectIssuesFiltered,
  makeSelectIssuesLoading,
  makeSelectIssuesRequestBody,
  makeSelectIssuesSearchDisabled,
  makeSelectIssuesStep,
  makeSelectOrganizationsDisabled,
};
