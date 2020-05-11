import { createSelector } from 'reselect';

import { filterIssues, organizeIssues, searchIssues } from './helpers';
import { initialState } from './reducer';

const selectIssuesDomain = state => state.issues || initialState;

const makeSelectIssues = prop =>
  createSelector(
    selectIssuesDomain,
    substate => substate[prop],
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

const makeSelectIssuesDisabled = () =>
  createSelector(
    makeSelectIssues('data'),
    data => {
      const tempData = { ...data };
      delete tempData.importUrl;
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
    makeSelectIssues('data'),
    data =>
      Object.keys(data).reduce((acc, field) => {
        acc[field] = data[field].value;
        return acc;
      }, {}),
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
};
