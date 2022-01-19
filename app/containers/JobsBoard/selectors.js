import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectJobsBoardDomain = state => state.jobsBoard || initialState;

const makeSelectJobsBoardLoading = prop =>
  createSelector(
    makeSelectJobsBoard('loading'),
    loading => loading[prop],
  );

const makeSelectJobsBoard = prop =>
  createSelector(
    selectJobsBoardDomain,
    substate => substate[prop],
  );

export default selectJobsBoardDomain;
export { makeSelectJobsBoard, makeSelectJobsBoardLoading };
