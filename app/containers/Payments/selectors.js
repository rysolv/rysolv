import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectPaymentsDomain = state => state.payments || initialState;

const makeSelectPayments = prop =>
  createSelector(
    selectPaymentsDomain,
    substate => substate[prop],
  );

export default selectPaymentsDomain;
export { makeSelectPayments };
