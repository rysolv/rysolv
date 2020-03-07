import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCompaniesDomain = state => state.companies || initialState;

const makeSelectCompanies = prop =>
  createSelector(
    selectCompaniesDomain,
    substate => substate[prop],
  );

const makeSelectCompaniesDisabled = () =>
  createSelector(
    makeSelectCompanies('data'),
    data => {
      const tempData = { ...data };
      delete tempData.importUrl;
      return Object.keys(tempData).every(item => tempData[item].value !== '');
    },
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

const makeSelectCompaniesStep = prop =>
  createSelector(
    makeSelectCompanies('step'),
    step => step[prop],
  );

export default selectCompaniesDomain;
export {
  makeSelectCompanies,
  makeSelectCompaniesDisabled,
  makeSelectCompaniesError,
  makeSelectCompaniesLoading,
  makeSelectCompaniesStep,
};
