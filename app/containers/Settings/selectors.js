import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectSettingsDomain = state => state.settings || initialState;

const makeSelectSettings = prop =>
  createSelector(
    selectSettingsDomain,
    substate => substate[prop],
  );

export default selectSettingsDomain;
export { makeSelectSettings };
