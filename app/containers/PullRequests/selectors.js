/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectPullRequestsDomain = state => state.pullRequests || initialState;

const makeSelectPullRequests = prop =>
  createSelector(
    selectPullRequestsDomain,
    substate => substate[prop],
  );

const makeSelectPullRequestsLoading = prop =>
  createSelector(
    makeSelectPullRequests('loading'),
    loading => loading[prop],
  );

export default selectPullRequestsDomain;
export { makeSelectPullRequests, makeSelectPullRequestsLoading };
