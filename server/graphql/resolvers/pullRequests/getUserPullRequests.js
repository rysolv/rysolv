const {
  getUserPullRequests: getUserPullRequestsQuery,
} = require('../../../db');

const getUserPullRequests = async args => {
  const { id } = args;
  try {
    const result = await getUserPullRequestsQuery({ pullRequestId: id });
    return {
      __typename: 'PullRequestArray',
      pullRequestArray: result,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = getUserPullRequests;
