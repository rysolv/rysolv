import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectAuthDomain = state => state.auth || initialState;

const makeSelectAuth = prop =>
  createSelector(
    selectAuthDomain,
    substate => substate[prop],
  );

const makeSelectAuthLoading = prop =>
  createSelector(
    makeSelectAuth('loading'),
    loading => loading[prop],
  );

export { makeSelectAuth, makeSelectAuthLoading };
