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

    const { github_id, github_username } = await requestGithubUser({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
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
