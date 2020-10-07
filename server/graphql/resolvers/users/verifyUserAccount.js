/* eslint-disable camelcase */
const { getOneUser, transformUser } = require('../../../db');
const { requestGithubUser } = require('../../../integrations/github');
const {
  verifyUserAccountError,
  verifyUserAccountSuccess,
} = require('./constants');

const verifyUserAccount = async ({ code, userId }) => {
  try {
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
    const { githubUsername, isGithubVerified } = await getOneUser({ userId });
    return {
      __typename: 'Verification',
      githubUsername,
      isGithubVerified,
      message: verifyUserAccountSuccess,
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: verifyUserAccountError,
    };
  }
};

module.exports = verifyUserAccount;
