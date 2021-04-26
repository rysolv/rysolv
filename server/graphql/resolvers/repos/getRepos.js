const { errorLogger } = require('../../../helpers');
const { getRepos: getReposQuery } = require('../../../db');
const { getReposError } = require('./constants');

const getRepos = async () => {
  try {
    const repos = await getReposQuery();
    return {
      __typename: 'RepoArray',
      repos,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: getReposError,
    };
  }
};

module.exports = getRepos;
