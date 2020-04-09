import { createSelector } from 'reselect';
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
  makeSelectIssues,
  makeSelectIssuesDisabled,
  makeSelectIssuesError,
  makeSelectIssuesLoading,
  makeSelectIssuesSearchDisabled,
  makeSelectIssuesStep,
};
