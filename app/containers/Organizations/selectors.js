/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';
import { extend, omit } from 'lodash';

import { formatActivity } from 'utils/formatActivity';
import { filterContributors, filterIssues } from 'utils/filterHelpers';

import {
  filterOrganizations,
  organizeOrganizations,
  searchOrganizations,
} from './helpers';
import { initialState } from './reducer';

const selectOrganizationsDomain = state => state.organizations || initialState;

const makeSelectOrganizations = prop =>
  createSelector(
    selectOrganizationsDomain,
    substate => substate[prop],
  );

const makeSelectOrganizationsDisabled = () =>
  createSelector(
    makeSelectOrganizations('organizationData'),
    data => {
      const tempData = omit(data, [
        'identiconId',
        'importUrl',
        'organizationId',
        'organizationLogo',
        'organizationUrl',
      ]);
      return Object.keys(tempData).every(item => tempData[item].value !== '');
    },
  );

const makeSelectOrganizationsEditRequest = () =>
  createSelector(
    makeSelectOrganizations('editInfo'),
    editInfo =>
      Object.keys(editInfo).reduce((acc, field) => {
        acc[field] = editInfo[field].value;
        return acc;
      }, {}),
  );

const makeSelectOrganizationsError = prop =>
  createSelector(
    makeSelectOrganizations('error'),
    error => error[prop],
  );

const makeSelectOrganizationsFiltered = () =>
  createSelector(
    makeSelectOrganizations('organizations'),
    makeSelectOrganizations('filter'),
    makeSelectOrganizations('search'),
    (organizations, filter, { overviewInput }) => {
      const { overview: overviewFilter } = filter;
      const searchedOrganizations = searchOrganizations(
        organizations,
        overviewInput,
      );
      const organizedOrganizations = organizeOrganizations(
        searchedOrganizations,
        overviewFilter,
      );
      const filteredOrganizations = filterOrganizations(
        organizedOrganizations,
        filter,
      );
      return filteredOrganizations;
    },
  );

const makeSelectOrganizationsFormattedData = () =>
  createSelector(
    makeSelectOrganizations('organization'),
    makeSelectOrganizations('filter'),
    makeSelectOrganizations('search'),
    makeSelectOrganizations('shouldSearch'),
    (organization, filter, { contributorInput, issueInput }) => {
      const {
        activity,
        contributors,
        issues,
        ownerId,
        ...restProps
      } = organization;
      const newIssues = extend([], issues);
      let returnObj = {};
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
        returnObj = { contributors: formattedContributors, ...restProps };
      }
      if (issues) {
        const filteredIssues = filterIssues(newIssues, filter, issueInput);
        returnObj = { issues: filteredIssues, ...returnObj };
      }
      if (activity) {
        const filteredActivity = activity.filter(
          el =>
            el.actionType !== 'add_watching' &&
            el.actionType !== 'remove_watching' &&
            el.actionType !== 'add_attempting' &&
            el.actionType !== 'remove_attempting',
        );
        const formattedActivity = filteredActivity.map(el =>
          formatActivity(el),
        );
        returnObj = { activity: formattedActivity, ...returnObj };
      }
      return returnObj;
    },
  );

const makeSelectOrganizationsLoading = prop =>
  createSelector(
    makeSelectOrganizations('loading'),
    loading => loading[prop],
  );

const makeSelectOrganizationsRequestBody = () =>
  createSelector(
    makeSelectOrganizations('isManual'),
    makeSelectOrganizations('organizationData'),
    (isManual, data) => {
      const requestBody = Object.keys(data).reduce((acc, field) => {
        acc[field] = data[field].value;
        return acc;
      }, {});
      if (requestBody.identiconId) requestBody.organizationLogo = '';
      return { isManual, ...requestBody };
    },
  );

const makeSelectOrganizationsSearchDisabled = prop =>
  createSelector(
    makeSelectOrganizations('search'),
    search => search[prop].value === '',
  );

const makeSelectOrganizationsStep = prop =>
  createSelector(
    makeSelectOrganizations('step'),
    step => step[prop],
  );

export default selectOrganizationsDomain;
export {
  makeSelectOrganizations,
  makeSelectOrganizationsDisabled,
  makeSelectOrganizationsEditRequest,
  makeSelectOrganizationsError,
  makeSelectOrganizationsFiltered,
  makeSelectOrganizationsFormattedData,
  makeSelectOrganizationsLoading,
  makeSelectOrganizationsRequestBody,
  makeSelectOrganizationsSearchDisabled,
  makeSelectOrganizationsStep,
};
