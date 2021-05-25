const { CustomError, errorLogger } = require('../../../helpers');
const {
  getOneIssue,
  getOneRepo,
  getUserAttemptList,
  getUserBounties,
  getUserPullRequestDetail,
  getUserSettings: getUserSettingsQuery,
  getUserWatchList,
} = require('../../../db');
const { getUserSettingsError } = require('./constants');

const getUserSettings = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await getUserSettingsQuery({ userId });
    const { issues, repos } = result || {};

    // Pull user attempting detail
    const attemptingListResult = await getUserAttemptList({ userId });

    // Pull user issue detail
    const issuesListResult = await Promise.all(
      issues.map(async issueId => {
        const issuesResult = await getOneIssue({ issueId });
        return issuesResult;
      }),
    );

    // Pull user repo detail
    const reposListResult = await Promise.all(
      repos.map(async repoId => {
        const reposResult = await getOneRepo({ repoId });
        return reposResult;
      }),
    );

    // Pull user pull request detail
    const {
      activePullRequests,
      completedPullRequests,
      rejectedPullRequests,
    } = await getUserPullRequestDetail({ userId });

    // Pull user watching detail
    const watchingListResult = await getUserWatchList({ userId });

    // Pull user bounties
    const bounties = await getUserBounties({ userId });

    result.activePullRequests = activePullRequests;
    result.attempting = attemptingListResult;
    result.bounties = bounties;
    result.completedPullRequests = completedPullRequests;
    result.issues = issuesListResult;
    result.notifications = false;
    result.rejectedPullRequests = rejectedPullRequests;
    result.repos = reposListResult;
    result.watching = watchingListResult;

    // Show notification for unaccepted bounties
    bounties.forEach(bounty => {
      if (!bounty.userAccepted) {
        result.notifications = true;
      }
    });

    return {
      __typename: 'User',
      ...result,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || getUserSettingsError,
    };
  }
};

module.exports = getUserSettings;
