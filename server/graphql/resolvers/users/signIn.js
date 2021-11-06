const { authenticateCognitoUser } = require('../../../middlewares/awsConfig');
const { errorLogger } = require('../../../helpers');
const { generateToken } = require('../../../middlewares/generateToken');
const {
  checkExistingGithubAccount,
  getOneIssue,
  getOneRepo,
  getUserAttemptList,
  getUserCompany,
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
    const { issues, repos } = result;

    const userCompany = await getUserCompany({ userId });

    // Pull user attempting detail
    const attemptingListResult = await getUserAttemptList({ userId });

    if (userCompany) {
      const { contractAcceptedDate, id, ...companyProps } = userCompany;
      result.company = {
        companyId: id,
        isContractAccepted: !!contractAcceptedDate,
        isQuestionnaireComplete: Object.keys(companyProps).every(
          prop => !!companyProps[prop],
        ),
      };
    }

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

    result.activePullRequests = activePullRequests;
    result.attempting = attemptingListResult;
    result.completedPullRequests = completedPullRequests;
    result.issues = issuesListResult;
    result.rejectedPullRequests = rejectedPullRequests;
    result.repos = reposListResult;
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
