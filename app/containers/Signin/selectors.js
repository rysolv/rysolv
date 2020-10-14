import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectSigninDomain = state => state.signin || initialState;

const makeSelectSignIn = prop =>
  createSelector(
    selectSigninDomain,
    substate => substate[prop],
  );

const makeSelectDisabled = prop =>
  createSelector(
    makeSelectSignIn(prop),
    data =>
      !Object.keys(data).every(
        item => data[item].error === '' && data[item].value !== '',
      ),
  );

export { makeSelectDisabled, makeSelectSignIn };
