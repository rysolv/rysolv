import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectCompanyPositionDetailDomain = state =>
  state.companyPositionDetail || initialState;

const makeSelectCompanyPositionDetailLoading = prop =>
  createSelector(
    makeSelectCompanyPositionDetail('loading'),
    loading => loading[prop],
  );

const makeSelectCompanyPositionDetail = prop =>
  createSelector(
    selectCompanyPositionDetailDomain,
    substate => substate[prop],
  );

export default selectCompanyPositionDetailDomain;
export {
  makeSelectCompanyPositionDetail,
  makeSelectCompanyPositionDetailLoading,
};
