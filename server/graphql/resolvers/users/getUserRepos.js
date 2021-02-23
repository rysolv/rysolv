/* eslint-disable no-param-reassign */
const { CustomError, errorLogger } = require('../../../helpers');
const { getRepoList, getUserSettings } = require('../../../db');
const { getUserGithubRepos } = require('../../../integrations');
const { githubNotVerifiedError } = require('./constants');

const getUserRepos = async (_, { authError, userId }) => {
  if (authError) throw new CustomError(authError);

  try {
    const { githubUsername, isGithubVerified } = await getUserSettings({
      userId,
    });

    if (isGithubVerified) {
      const repoList = await getRepoList();

      const userRepos = await getUserGithubRepos({
        username: githubUsername,
      });

      const repos = userRepos.map(repo => {
        const parentArray = repo.organizationUrl.split('/');
        parentArray.pop();
        const parentUrl = parentArray.join('/');

        if (
          repoList &&
          (repoList.includes(repo.organizationUrl) ||
            repoList.includes(parentUrl))
        ) {
          repo.exists = true;
          return repo;
        }
        repo.exists = false;
        return repo;
      });

      return {
        __typename: 'RepoArray',
        repos,
      };
    }
    throw new CustomError(githubNotVerifiedError);
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert,
    };
  }
};

module.exports = getUserRepos;
