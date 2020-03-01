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

const makeCompanyErrors = prop =>
  createSelector(
    selectForm(prop),
    importUrl => importUrl.errors,
  );

const makeCompanyInputs = prop =>
  createSelector(
    selectForm(prop),
    importUrl => importUrl.values,
  );

const selectAdd = prop =>
  createSelector(
    makeSelectCompanies('add'),
    addState => addState[prop],
  );

const selectForm = prop =>
  createSelector(
    selectAdd('forms'),
    forms => forms[prop],
  );

export default selectCompaniesDomain;
export {
  makeCompanyErrors,
  makeCompanyInputs,
  makeSelectCompanies,
  makeSelectCompaniesError,
  makeSelectCompaniesLoading,
};
