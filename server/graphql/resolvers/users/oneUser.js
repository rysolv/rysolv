const {
  getOneIssue,
  getOneOrganization,
  getOneUser,
  getUserAttemptList,
  getUserWatchList,
} = require('../../../db');

const oneUser = async args => {
  const { id: userId } = args;
  try {
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

    // Pull watch-list detail
    const watchingListResult = await getUserWatchList({ userId });
    result.watching = watchingListResult;

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = oneUser;
