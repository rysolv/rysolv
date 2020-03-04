import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCompaniesDomain = state => state.companies || initialState;

const makeSelectCompanies = prop =>
  createSelector(
    selectCompaniesDomain,
    substate => substate[prop],
  );

const makeSelectCompaniesError = prop =>
  createSelector(
    makeSelectCompanies('error'),
    error => error[prop],
  );

const makeSelectCompaniesLoading = prop =>
  createSelector(
    makeSelectCompanies('loading'),
    loading => loading[prop],
  );

const makeSelectCompaniesDisabled = () =>
  createSelector(
    makeSelectCompanies('data'),
    data => Object.keys(data).every(item => data[item].value === ''),
  );

export default selectCompaniesDomain;
export {
  makeSelectCompanies,
  makeSelectCompaniesDisabled,
  makeSelectCompaniesError,
  makeSelectCompaniesLoading,
};
