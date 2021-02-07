const { CustomError, errorLogger } = require('../../../helpers');
const {
  getOneIssue,
  getOneOrganization,
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
    const { issues, organizations } = result;

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

    // Pull user organization detail
    const organizationsListResult = await Promise.all(
      organizations.map(async organizationId => {
        const organizationsResult = await getOneOrganization({
          organizationId,
        });
        return organizationsResult;
      }),
    );
    const filteredOrganizationsList = organizationsListResult.filter(
      organization => organization,
    );

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
    result.organizations = filteredOrganizationsList;
    result.rejectedPullRequests = rejectedPullRequests;
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
