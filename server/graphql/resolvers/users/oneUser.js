const { errorLogger } = require('../../../helpers');
const { getOneUser, getUserPullRequestDetail } = require('../../../db');
const { oneUserError } = require('./constants');

const oneUser = async ({ userId }) => {
  try {
    const result = await getOneUser({ userId });

    const {
      activePullRequests,
      completedPullRequests,
      rejectedPullRequests,
    } = await getUserPullRequestDetail({ userId });
    result.activePullRequests = activePullRequests;
    result.completedPullRequests = completedPullRequests;
    result.rejectedPullRequests = rejectedPullRequests;

    return {
      __typename: 'User',
      ...result,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: oneUserError,
    };
  }
};

module.exports = oneUser;
