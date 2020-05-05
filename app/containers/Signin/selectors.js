import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSigninDomain = state => state.signin || initialState;

const makeSelectSignin = prop =>
  createSelector(
    selectSigninDomain,
    substate => substate[prop],
  );

export { makeSelectSignin };
