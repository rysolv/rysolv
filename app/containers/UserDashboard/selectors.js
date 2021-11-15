import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectUserDashboardDomain = state => state.userDashboard || initialState;
const selectUserDashboardProps = (state, props) => props;

const makeSelectUserDashboard = prop =>
  createSelector(
    selectUserDashboardDomain,
    substate => substate[prop],
  );

const makeSelectUserDashboardView = () =>
  createSelector(
    selectUserDashboardProps,
    props => props.match.params.view || 'main',
  );

export default selectUserDashboardDomain;
export { makeSelectUserDashboard, makeSelectUserDashboardView };
