import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectContactUsDomain = state => state.contactUs || initialState;

const makeSelectContactUs = prop =>
  createSelector(
    selectContactUsDomain,
    substate => substate[prop],
  );

export default selectContactUsDomain;
export { makeSelectContactUs };
