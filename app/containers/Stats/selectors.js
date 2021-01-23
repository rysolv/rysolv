import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectStatsDomain = state => state.stats || initialState;

const makeSelectStats = prop =>
  createSelector(
    selectStatsDomain,
    substate => substate[prop],
  );

export default selectStatsDomain;
export { makeSelectStats };
