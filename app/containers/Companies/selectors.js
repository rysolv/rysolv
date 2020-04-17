import { createSelector } from 'reselect';

import { filterContributors } from 'utils/filterHelpers';

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

const makeSelectCompaniesEditRequest = () =>
  createSelector(
    makeSelectCompanies('editInfo'),
    editInfo =>
      Object.keys(editInfo).reduce((acc, field) => {
        acc[field] = editInfo[field].value;
        return acc;
      }, {}),
  );

const makeSelectCompaniesError = prop =>
  createSelector(
    makeSelectCompanies('error'),
    error => error[prop],
  );

const makeSelectCompaniesFormattedData = () =>
  createSelector(
    makeSelectCompanies('company'),
    makeSelectCompanies('search'),
    makeSelectCompanies('shouldSearch'),
    (company, { contributorInput }) => {
      const { contributors, ownerId, ...restProps } = company;
      if (contributors) {
        const filteredContributors = filterContributors(
          contributors,
          contributorInput,
        );
        const formattedContributors = filteredContributors.map(contributor => {
          const { id } = contributor;
          // eslint-disable-next-line no-param-reassign
          contributor.isOwner = id === ownerId;
          return contributor;
        });
        return { contributors: formattedContributors, ...restProps };
      }
      return {};
    },
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

const makeSelectCompaniesSearchDisabled = prop =>
  createSelector(
    makeSelectCompanies('search'),
    search => search[prop].value === '',
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
  makeSelectCompaniesEditRequest,
  makeSelectCompaniesError,
  makeSelectCompaniesFormattedData,
  makeSelectCompaniesLoading,
  makeSelectCompaniesRequestBody,
  makeSelectCompaniesSearchDisabled,
  makeSelectCompaniesStep,
};
