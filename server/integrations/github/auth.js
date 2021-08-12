const { Octokit } = require('@octokit/rest');
const { createTokenAuth } = require('@octokit/auth-token');

const authenticate = async () => {
  const auth = createTokenAuth(process.env.GITHUB_TOKEN);
  const { token } = await auth();

  const GITHUB = new Octokit({
    auth: token,
  });

  return { GITHUB };
};

module.exports = { authenticate };
