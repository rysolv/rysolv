const { errorLogger } = require('../../../helpers');
const { getPullRequestList: getPullRequestListQuery } = require('../../../db');

const getPullRequestList = async ({ issueId }) => {
  try {
    const pullRequestList = await getPullRequestListQuery({ issueId });
    return pullRequestList;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = getPullRequestList;
