import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectCompanyRecruitmentDomain = state =>
  state.companyRecruitment || initialState;

const makeSelectCompanyRecruitment = prop =>
  createSelector(
    selectCompanyRecruitmentDomain,
    substate => substate[prop],
  );

export default selectCompanyRecruitmentDomain;
export { makeSelectCompanyRecruitment };
