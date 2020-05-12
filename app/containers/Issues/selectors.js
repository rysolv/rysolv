import { createSelector } from 'reselect';
import { omit } from 'lodash';
import { filterIssues } from './helpers';
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

const makeSelectOrganizationsDisabled = () =>
  createSelector(
    makeSelectIssues('organizationData'),
    data => {
      const tempData = omit(data, ['organizationId']);
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
    (issues, filter) => {
      const filteredIssues = filterIssues(issues, filter);
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
    makeSelectIssues('organizationData'),
    (data, organizationData) => {
      const formData = { ...data, ...organizationData };
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
