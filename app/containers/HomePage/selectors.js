import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectHomePageDomain = state => state.homePage || initialState;

const makeSelectHomePage = prop =>
  createSelector(
    selectHomePageDomain,
    substate => substate[prop],
  );

export default selectHomePageDomain;
export { makeSelectHomePage };
