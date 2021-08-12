const { CustomError, errorLogger } = require('../../../helpers');
const {
  getUserPullRequests: getUserPullRequestsQuery,
} = require('../../../db');
const { getUserPullRequestsError } = require('./constants');

const getUserPullRequests = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await getUserPullRequestsQuery({ userId });
    return {
      __typename: 'PullRequestArray',
      pullRequestArray: result,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || getUserPullRequestsError,
    };
  }
};

module.exports = getUserPullRequests;
