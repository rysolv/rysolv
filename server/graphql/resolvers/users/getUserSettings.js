const {
  getOneIssue,
  getOneOrganization,
  getOneUser,
  getUserAttemptList,
  getUserPullRequestDetail,
  getUserWatchList,
} = require('../../../db');
const { getUserSettingsError } = require('./constants');

const getUserSettings = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new Error(authError);

    const result = await getOneUser({ userId });
    const { issues, organizations } = result;

    // Pull user attempting detail
    const attemptingListResult = await getUserAttemptList({ userId });
    result.attempting = attemptingListResult;

    // Pull user issue detail
    const issuesListResult = await Promise.all(
      issues.map(async issueId => {
        const issuesResult = await getOneIssue({ issueId });
        return issuesResult;
      }),
    );
    result.issues = issuesListResult;

    // Pull user organization detail
    const organizationsListResult = await Promise.all(
      organizations.map(async organizationId => {
        const organizationsResult = await getOneOrganization({
          organizationId,
        });
        return organizationsResult;
      }),
    );
    result.organizations = organizationsListResult;

    // Pull user pull request detail
    const {
      activePullRequests,
      completedPullRequests,
      rejectedPullRequests,
    } = await getUserPullRequestDetail({ userId });
    result.activePullRequests = activePullRequests;
    result.completedPullRequests = completedPullRequests;
    result.rejectedPullRequests = rejectedPullRequests;

    // Pull user watching detail
    const watchingListResult = await getUserWatchList({ userId });
    result.watching = watchingListResult;

    return {
      __typename: 'User',
      ...result,
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: getUserSettingsError,
    };
  }
};

module.exports = getUserSettings;
