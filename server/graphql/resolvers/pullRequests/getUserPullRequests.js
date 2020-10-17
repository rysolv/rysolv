const { errorLogger } = require('../../../helpers');
const {
  getUserPullRequests: getUserPullRequestsQuery,
} = require('../../../db');
const { getUserPullRequestsError } = require('./constants');

const getUserPullRequests = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new Error(authError);

    const result = await getUserPullRequestsQuery({ pullRequestId: userId });
    return {
      __typename: 'PullRequestArray',
      pullRequestArray: result,
    };
  } catch (error) {
    const { message } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: message || getUserPullRequestsError,
    };
  }
};

module.exports = getUserPullRequests;
