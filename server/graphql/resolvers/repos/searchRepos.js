const { errorLogger } = require('../../../helpers');
const { searchRepos: searchReposQuery } = require('../../../db');

const searchRepos = async ({ value }) => {
  try {
    const repos = await searchReposQuery({ value });
    return repos;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = searchRepos;
