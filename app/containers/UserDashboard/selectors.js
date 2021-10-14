import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectUserDashboardDomain = state => state.userDashboard || initialState;

const makeSelectUserDashboard = prop =>
  createSelector(
    selectUserDashboardDomain,
    substate => substate[prop],
  );

export default selectUserDashboardDomain;
export { makeSelectUserDashboard };
