/* eslint-disable camelcase */
const { requestGithubUser } = require('../../../integrations/github');
const { transformUser } = require('../../../db');

const verifyUserAccount = async args => {
  const { code, userId } = args;
  try {
    const { github_id, github_username } = await requestGithubUser({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      code,
    });
    const { githubUsername, isGithubVerified } = await transformUser({
      data: {
        github_id,
        github_username,
        modified_date: new Date(),
      },
      userId,
    });
    return {
      __typename: 'Verification',
      githubUsername,
      isGithubVerified,
      message: `Your Github account has been successfully verified.`,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = verifyUserAccount;
