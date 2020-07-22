import { createSelector } from 'reselect';
import { omit } from 'lodash';

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
    data => !Object.keys(data).every(item => data[item].value !== ''),
  );

const makeSelectVerifyDisabled = () =>
  createSelector(
    makeSelectSignIn('verify'),
    data => {
      const tempData = omit(data, []);
      return Object.keys(tempData).every(item => tempData[item].value !== '');
    },
  );
export { makeSelectDisabled, makeSelectSignIn, makeSelectVerifyDisabled };
