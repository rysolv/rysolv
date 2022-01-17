import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectCompanyPositionDetailDomain = state =>
  state.companyPositionDetail || initialState;

const makeSelectCompanyPositionDetail = prop =>
  createSelector(
    selectCompanyPositionDetailDomain,
    substate => substate[prop],
  );

export default selectCompanyPositionDetailDomain;
export { makeSelectCompanyPositionDetail };
