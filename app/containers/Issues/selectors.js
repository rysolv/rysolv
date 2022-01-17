import { createSelector } from 'reselect';
import omit from 'lodash/omit';

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
      const tempData = omit(issueData, ['identiconId', 'importUrl']);
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

const makeSelectReposDisabled = () =>
  createSelector(
    makeSelectIssues('repoData'),
    data => {
      const tempData = omit(data, [
        'identiconId',
        'importUrl',
        'organizationUrl',
        'repoId',
        'repoLogo',
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
    makeSelectIssues('isManual'),
    makeSelectIssues('issueData'),
    makeSelectIssues('repoData'),
    (isManual, issueData, repoData) => {
      const formData = { ...issueData, ...repoData };
      const requestBody = Object.keys(formData).reduce((acc, field) => {
        acc[field] = formData[field].value;
        return acc;
      }, {});
      if (requestBody.identiconId) requestBody.repoLogo = '';
      return { isManual, ...requestBody };
    },
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
  makeSelectIssuesStep,
  makeSelectReposDisabled,
};
