import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAdminsDomain = state => state.admin || initialState;

const makeSelectAdmin = prop =>
  createSelector(
    selectAdminsDomain,
    substate => substate[prop],
  );

export { makeSelectAdmin };
