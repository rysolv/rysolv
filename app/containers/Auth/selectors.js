import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuthDomain = state => state.auth || initialState;

const makeSelectActiveUser = prop =>
  createSelector(
    selectAuthDomain,
    substate => substate[prop],
  );

export { makeSelectActiveUser };
