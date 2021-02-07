/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase, consistent-return, prettier/prettier */
const { v4: uuidv4 } = require('uuid');
const Identicon = require('identicon.js');

const {
  checkDuplicateGithubId,
  checkDuplicateUserEmail,
  createLanguage,
  createUser,
  getOneIssue,
  getOneOrganization,
  getUserAttemptList,
  getUserPullRequestDetail,
  getUserSettings: getUserSettingsQuery,
  getUserWatchList,
} = require('../../../db');
const { errorLogger, sendEmail } = require('../../../helpers');
const { generateToken } = require('../../../middlewares/generateToken');
const { githubSignInError, githubSignUpError } = require('./constants');
const { requestGithubUser } = require('../../../integrations/github');
const { uploadImage } = require('../../../middlewares/imageUpload');

const githubSignIn = async ({ code, isSignIn }, { res }) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const client_id = isSignIn
      ? isProduction
        ? process.env.GITHUB_SIGNIN_CLIENT_ID
        : process.env.GITHUB_SIGNIN_CLIENT_ID_DEV
      : isProduction
        ? process.env.GITHUB_SIGNUP_CLIENT_ID
        : process.env.GITHUB_SIGNUP_CLIENT_ID_DEV;
    const client_secret = isSignIn
      ? isProduction
        ? process.env.GITHUB_SIGNIN_SECRET
        : process.env.GITHUB_SIGNIN_SECRET_DEV
      : isProduction
        ? process.env.GITHUB_SIGNUP_SECRET
        : process.env.GITHUB_SIGNUP_SECRET_DEV;
    const {
      avatar_url,
      email,
      first_name,
      github_id,
      github_link,
      github_username,
      languages,
      last_name,
    } = await requestGithubUser({ client_id, client_secret, code });

    const { isDuplicateGithubId, userId } = await checkDuplicateGithubId({
      githubId: github_id,
    });
    const provider = 'github';

    if (!isDuplicateGithubId && !userId) {
      if (email) await checkDuplicateUserEmail({ email });

      const date = new Date();
      const id = uuidv4();

      const imageToUpload = avatar_url || new Identicon(id, 250).toString();
      const { uploadUrl } = await uploadImage(imageToUpload);
      const newUser = {
        created_date: date,
        email_verified: true,
        email,
        first_name,
        github_id,
        github_link,
        github_username,
        id,
        last_name,
        modified_date: date,
        profile_pic: uploadUrl,
        provider,
        username: github_username,
      };
      const result = await createUser({ data: newUser });

      if(languages.length) {
        await createLanguage({
          languages,
          target: {
            userId: id,
          },
        });
      }

      const token = generateToken({
        email,
        provider,
        userId: id,
      });

      res.cookie('userToken', token, {
        httpOnly: true,
        maxAge: process.env.COOKIE_EXPIRATION,
      });
      res.cookie('signedIn', true, {
        maxAge: process.env.COOKIE_EXPIRATION,
      });

      sendEmail({
        body: { userId: id },
        path: '/s/users/welcome',
      });

      return {
        __typename: 'User',
        ...result,
      };
    }
    if (isDuplicateGithubId && userId) {
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

      const token = generateToken({
        email: result.email,
        provider,
        userId,
      });

      res.cookie('userToken', token, {
        httpOnly: true,
        maxAge: process.env.COOKIE_EXPIRATION,
      });
      res.cookie('signedIn', true, {
        maxAge: process.env.COOKIE_EXPIRATION,
      });

      return {
        __typename: 'User',
        ...result,
      };
    }
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    const errorMessageToReturn = isSignIn
      ? githubSignInError
      : githubSignUpError;
    return {
      __typename: 'Error',
      message: alert || errorMessageToReturn,
    };
  }
};

module.exports = githubSignIn;
