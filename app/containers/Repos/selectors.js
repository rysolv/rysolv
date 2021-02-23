/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';
import { extend, omit } from 'lodash';

import { formatActivity } from 'utils/formatActivity';
import { filterContributors, filterIssues } from 'utils/filterHelpers';

import { filterRepos, organizeRepos, searchRepos } from './helpers';
import { initialState } from './reducer';

const selectReposDomain = state => state.repos || initialState;

const makeSelectRepos = prop =>
  createSelector(
    selectReposDomain,
    substate => substate[prop],
  );

const makeSelectReposDisabled = () =>
  createSelector(
    makeSelectRepos('repoData'),
    data => {
      const tempData = omit(data, [
        'identiconId',
        'importUrl',
        'organizationUrl',
        'repoId',
        'repoLogo',
      ]);
      return Object.keys(tempData).every(item => tempData[item].value !== '');
    },
  );

const makeSelectReposError = prop =>
  createSelector(
    makeSelectRepos('error'),
    error => error[prop],
  );

const makeSelectReposFiltered = () =>
  createSelector(
    makeSelectRepos('repos'),
    makeSelectRepos('filter'),
    makeSelectRepos('search'),
    (repos, filter, { overviewInput }) => {
      const { overview: overviewFilter } = filter;
      const searchedRepos = searchRepos(repos, overviewInput);
      const organizedRepos = organizeRepos(searchedRepos, overviewFilter);
      const filteredRepos = filterRepos(organizedRepos, filter);
      return filteredRepos;
    },
  );

const makeSelectReposFormattedData = () =>
  createSelector(
    makeSelectRepos('repo'),
    makeSelectRepos('filter'),
    makeSelectRepos('search'),
    makeSelectRepos('shouldSearch'),
    (repo, filter, { contributorInput, issueInput }) => {
      const { activity, contributors, issues, ...restProps } = repo;
      const newIssues = extend([], issues);
      let returnObj = {};
      if (contributors) {
        const filteredContributors = filterContributors(
          contributors,
          contributorInput,
        );
        returnObj = { contributors: filteredContributors, ...restProps };
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

const makeSelectReposLoading = prop =>
  createSelector(
    makeSelectRepos('loading'),
    loading => loading[prop],
  );

const makeSelectReposRequestBody = () =>
  createSelector(
    makeSelectRepos('isManual'),
    makeSelectRepos('repoData'),
    (isManual, data) => {
      const requestBody = Object.keys(data).reduce((acc, field) => {
        acc[field] = data[field].value;
        return acc;
      }, {});
      if (requestBody.identiconId) requestBody.repoLogo = '';
      return { isManual, ...requestBody };
    },
  );

const makeSelectReposStep = prop =>
  createSelector(
    makeSelectRepos('step'),
    step => step[prop],
  );

export default selectReposDomain;
export {
  makeSelectRepos,
  makeSelectReposDisabled,
  makeSelectReposError,
  makeSelectReposFiltered,
  makeSelectReposFormattedData,
  makeSelectReposLoading,
  makeSelectReposRequestBody,
  makeSelectReposStep,
};
