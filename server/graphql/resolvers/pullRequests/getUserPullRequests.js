const {
  getUserPullRequests: getUserPullRequestsQuery,
} = require('../../../db');
const { getUserPullRequestsError } = require('./constants');

const getUserPullRequests = async ({ id }) => {
  try {
    const result = await getUserPullRequestsQuery({ pullRequestId: id });
    return {
      __typename: 'PullRequestArray',
      pullRequestArray: result,
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: getUserPullRequestsError,
    };
  }
};

module.exports = getUserPullRequests;
