/* eslint-disable camelcase, consistent-return */
const { v4: uuidv4 } = require('uuid');
const Identicon = require('identicon.js');

const {
  assignOwnerToRepo,
  checkDuplicateGithubId,
  checkDuplicateUserEmail,
  createLanguage,
  createUser,
  getOneIssue,
  getOneRepo,
  getUserAttemptList,
  getUserPullRequestDetail,
  getUserSettings: getUserSettingsQuery,
  getUserWatchList,
  insertGitUser,
  insertUserEmail,
  transformUser: transformUserQuery,
} = require('../../../db');
const { analyzeUser, errorLogger, sendEmail } = require('../../../helpers');
const { generateToken } = require('../../../middlewares/generateToken');
const { githubSignInError, githubSignUpError } = require('./constants');
const { requestGithubUser } = require('../../../integrations/github');
const { uploadImage } = require('../../../middlewares/imageUpload');

const githubSignIn = async ({ code, origin }, { res }) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    const githubProps = {
      jobs: {
        dev: {
          client_id: process.env.GITHUB_JOBS_CLIENT_ID_DEV,
          client_secret: process.env.GITHUB_JOBS_SECRET_DEV,
        },
        prod: {
          client_id: process.env.GITHUB_JOBS_CLIENT_ID,
          client_secret: process.env.GITHUB_JOBS_SECRET,
        },
      },
      signin: {
        dev: {
          client_id: process.env.GITHUB_SIGNIN_CLIENT_ID_DEV,
          client_secret: process.env.GITHUB_SIGNIN_SECRET_DEV,
        },
        prod: {
          client_id: process.env.GITHUB_SIGNIN_CLIENT_ID,
          client_secret: process.env.GITHUB_SIGNIN_SECRET,
        },
      },
      signup: {
        dev: {
          client_id: process.env.GITHUB_SIGNUP_CLIENT_ID_DEV,
          client_secret: process.env.GITHUB_SIGNUP_SECRET_DEV,
        },
        prod: {
          client_id: process.env.GITHUB_SIGNUP_CLIENT_ID,
          client_secret: process.env.GITHUB_SIGNUP_SECRET,
        },
      },
    };
    const { client_id, client_secret } = githubProps[origin][isProduction];
    const {
      avatar_url,
      email,
      emailList,
      first_name,
      github_id,
      github_link,
      github_username,
      githubToken,
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
        user_type: 'full',
        username: github_username,
      };
      const result = await createUser({ data: newUser });

      // insert git_user
      await insertGitUser({ githubId: github_id, githubToken, userId: id });

      // Save down github emails
      await Promise.all(
        emailList.map(async ({ email: githubEmail, primary }) => {
          await insertUserEmail({ email: githubEmail, primary, userId: id });
        }),
      );

      await assignOwnerToRepo({ githubId: github_id, userId: id });

      // Async call to initiate git_analytics
      analyzeUser({ userId: id });

      if (languages.length) {
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
      const data = { modified_date: new Date(), user_type: 'full' };
      await transformUserQuery({ data, userId });

      // insert git_user
      await insertGitUser({ githubId: github_id, githubToken, userId });

      // Save down github emails
      await Promise.all(
        emailList.map(async ({ email: githubEmail, primary }) => {
          await insertUserEmail({ email: githubEmail, primary, userId });
        }),
      );

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

      // Pull user pull request detail
      const {
        activePullRequests,
        completedPullRequests,
        rejectedPullRequests,
      } = await getUserPullRequestDetail({ userId });

      // Pull user repo detail
      const reposListResult = await Promise.all(
        repos.map(async repoId => {
          const reposResult = await getOneRepo({ repoId });
          return reposResult;
        }),
      );

      // Pull user watching detail
      const watchingListResult = await getUserWatchList({ userId });

      result.activePullRequests = activePullRequests;
      result.attempting = attemptingListResult;
      result.completedPullRequests = completedPullRequests;
      result.issues = issuesListResult;
      result.rejectedPullRequests = rejectedPullRequests;
      result.repos = reposListResult;
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
    const errorMessageToReturn =
      origin === 'jobs' || origin === 'signin'
        ? githubSignInError
        : githubSignUpError;
    return {
      __typename: 'Error',
      message: alert || errorMessageToReturn,
    };
  }
};

module.exports = githubSignIn;
