import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectMessagesDomain = state => state.messages || initialState;

const makeSelectMessages = prop =>
  createSelector(
    selectMessagesDomain,
    substate => substate[prop],
  );

export default selectMessagesDomain;
export { makeSelectMessages };
