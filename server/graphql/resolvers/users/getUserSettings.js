const { CustomError, errorLogger } = require('../../../helpers');
const {
  getOneIssue,
  getOneRepo,
  getUserAttemptList,
  getUserPullRequestDetail,
  getUserSettings: getUserSettingsQuery,
  getUserWatchList,
} = require('../../../db');
const { getUserSettingsError } = require('./constants');

const getUserSettings = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await getUserSettingsQuery({ userId });
    const { issues, repos } = result;

    // Pull user attempting detail
    const attemptingListResult = await getUserAttemptList({ userId });

    // Pull user issue detail
    const issuesListResult = await Promise.all(
      issues.map(async issueId => {
        const issuesResult = await getOneIssue({ issueId });
        return issuesResult;
      }),
    );
    const filteredIssuesList = issuesListResult.filter(issue => issue);

    // Pull user repo detail
    const reposListResult = await Promise.all(
      repos.map(async repoId => {
        const reposResult = await getOneRepo({ repoId });
        return reposResult;
      }),
    );
    const filteredReposList = reposListResult.filter(repo => repo);

    // Pull user pull request detail
    const {
      activePullRequests,
      completedPullRequests,
      rejectedPullRequests,
    } = await getUserPullRequestDetail({ userId });

    // Pull user watching detail
    const watchingListResult = await getUserWatchList({ userId });

    result.activePullRequests = activePullRequests;
    result.attempting = attemptingListResult;
    result.completedPullRequests = completedPullRequests;
    result.issues = filteredIssuesList;
    result.rejectedPullRequests = rejectedPullRequests;
    result.repos = filteredReposList;
    result.watching = watchingListResult;

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
