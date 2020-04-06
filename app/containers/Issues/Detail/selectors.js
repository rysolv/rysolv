import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectIssuesDomain = state => state.issueDetail || initialState;

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

const makeSelectIssueDetailLoading = prop =>
  createSelector(
    makeSelectIssueDetail('loading'),
    loading => loading[prop],
  );

export default selectIssuesDomain;
export {
  makeSelectIssueDetail,
  makeSelectIssueDetailError,
  makeSelectIssueDetailLoading,
};
