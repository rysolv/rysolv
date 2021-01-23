/* eslint-disable camelcase */
const { CustomError, errorLogger } = require('../../../helpers');
const { getUserSettings, transformUser } = require('../../../db');
const { requestGithubUser } = require('../../../integrations/github');
const {
  verifyUserAccountError,
  verifyUserAccountSuccess,
} = require('./constants');

const verifyUserAccount = async ({ code }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const isProduction = process.env.NODE_ENV === 'production';
    const { github_id, github_username } = await requestGithubUser({
      client_id: isProduction
        ? process.env.GITHUB_VERIFY_CLIENT_ID
        : process.env.GITHUB_VERIFY_CLIENT_ID_DEV,
      client_secret: isProduction
        ? process.env.GITHUB_VERIFY_SECRET
        : process.env.GITHUB_VERIFY_SECRET_DEV,
      code,
    });
    await transformUser({
      data: {
        github_id,
        github_username,
        modified_date: new Date(),
      },
      userId,
    });
    const { githubUsername, isGithubVerified } = await getUserSettings({
      userId,
    });
    return {
      __typename: 'Verification',
      githubUsername,
      isGithubVerified,
      message: verifyUserAccountSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || verifyUserAccountError,
    };
  }
};

module.exports = verifyUserAccount;
