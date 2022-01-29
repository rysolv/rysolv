const { Octokit } = require('@octokit/rest');
const { createTokenAuth } = require('@octokit/auth-token');

const authenticate = async payload => {
  const { userToken } = { ...payload };
  const authToken = userToken || process.env.GITHUB_TOKEN;
  const auth = createTokenAuth(authToken);
  const { token } = await auth();

  const GITHUB = new Octokit({
    auth: token,
  });

  return { GITHUB };
};

module.exports = { authenticate };
