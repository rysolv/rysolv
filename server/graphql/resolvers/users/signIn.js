const { authenticateCognitoUser } = require('../../../middlewares/awsConfig');
const { errorLogger } = require('../../../helpers');
const { generateToken } = require('../../../middlewares/generateToken');
const {
  checkExistingGithubAccount,
  getOneIssue,
  getOneOrganization,
  getUserAttemptList,
  getUserPullRequestDetail,
  getUserSettings: getUserSettingsQuery,
  getUserWatchList,
} = require('../../../db');
const { signInError } = require('./constants');

const signIn = async ({ password, username }, { res }) => {
  try {
    await checkExistingGithubAccount({ email: username });

    const { userId } = await authenticateCognitoUser({ password, username });

    const token = generateToken({
      email: username,
      provider: 'cognito',
      userId,
    });

    res.cookie('userToken', token, {
      httpOnly: true,
      maxAge: process.env.COOKIE_EXPIRATION,
    });
    res.cookie('signedIn', true, {
      maxAge: process.env.COOKIE_EXPIRATION,
    });

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

    // Pull user organization detail
    const organizationsListResult = await Promise.all(
      organizations.map(async organizationId => {
        const organizationsResult = await getOneOrganization({
          organizationId,
        });
        return organizationsResult;
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

    result.activePullRequests = activePullRequests;
    result.attempting = attemptingListResult;
    result.completedPullRequests = completedPullRequests;
    result.issues = issuesListResult;
    result.organizations = organizationsListResult;
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
      message: alert || signInError,
    };
  }
};

module.exports = signIn;
