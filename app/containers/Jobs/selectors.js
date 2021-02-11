import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectJobsDomain = state => state.jobs || initialState;

const makeSelectJobs = prop =>
  createSelector(
    selectJobsDomain,
    substate => substate[prop],
  );

export default selectJobsDomain;
export { makeSelectJobs };
