const { getOneUser, getUserPullRequestDetail } = require('../../../db');
const { userOverviewError } = require('./constants');

const userOverview = async ({ userId }) => {
  try {
    const result = await getOneUser({ userId });

    // Pull user pull request detail
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
    return {
      __typename: 'Error',
      message: userOverviewError,
    };
  }
};

module.exports = userOverview;
