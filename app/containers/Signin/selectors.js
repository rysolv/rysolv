import { createSelector } from 'reselect';
import { omit } from 'lodash';

import { initialState } from './reducer';

const selectSigninDomain = state => state.signin || initialState;

const makeSelectSignIn = prop =>
  createSelector(
    selectSigninDomain,
    substate => substate[prop],
  );

const makeSelectSignUpDisabled = () =>
  createSelector(
    makeSelectSignIn('signUp'),
    data => {
      const tempData = omit(data, []);
      return Object.keys(tempData).every(item => tempData[item].value !== '');
    },
  );

const makeSelectVerifyDisabled = () =>
  createSelector(
    makeSelectSignIn('verify'),
    data => {
      const tempData = omit(data, []);
      return Object.keys(tempData).every(item => tempData[item].value !== '');
    },
  );
export { makeSelectSignIn, makeSelectSignUpDisabled, makeSelectVerifyDisabled };
