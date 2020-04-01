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

const makeSelectCompaniesRequestBody = () =>
  createSelector(
    makeSelectCompanies('data'),
    data =>
      Object.keys(data).reduce((acc, field) => {
        acc[field] = data[field].value;
        return acc;
      }, {}),
  );

const makeSelectCompaniesSearchDisabled = () =>
  createSelector(
    makeSelectCompanies('search'),
    ({ searchInput }) => searchInput.value === '',
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
  makeSelectCompaniesRequestBody,
  makeSelectCompaniesSearchDisabled,
  makeSelectCompaniesStep,
};
