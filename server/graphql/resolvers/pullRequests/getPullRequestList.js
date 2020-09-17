const { getPullRequestList: getPullRequestListQuery } = require('../../../db');

const getPullRequestList = async ({ issueId }) => {
  try {
    const result = await getPullRequestListQuery({ issueId });
    return {
      __typename: 'PullRequestList',
      pullRequestList: result,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = getPullRequestList;
