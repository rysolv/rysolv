/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectOverviewDomain = state => state.overview || initialState;

const makeSelectOverview = prop =>
  createSelector(
    selectOverviewDomain,
    substate => substate[prop],
  );

export default makeSelectOverview;
export { selectOverviewDomain };
