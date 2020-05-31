import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectMainDomain = state => state.main || initialState;

const makeSelectMain = prop =>
  createSelector(
    selectMainDomain,
    substate => substate[prop],
  );

export default selectMainDomain;
export { makeSelectMain };
