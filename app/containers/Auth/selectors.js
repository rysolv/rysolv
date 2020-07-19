import { createSelector } from 'reselect';
import omit from 'lodash/omit';

import { initialState } from './reducer';

const selectAuthDomain = state => state.auth || initialState;

const makeSelectAuth = prop =>
  createSelector(
    selectAuthDomain,
    substate => substate[prop],
  );

const makeSelectAuthError = prop =>
  createSelector(
    makeSelectAuth('error'),
    error => {
      if (prop === 'signUp') {
        return omit(error, ['signIn']);
      }
      return error[prop];
    },
  );

const makeSelectAuthLoading = prop =>
  createSelector(
    makeSelectAuth('loading'),
    loading => loading[prop],
  );

export { makeSelectAuth, makeSelectAuthError, makeSelectAuthLoading };
