const {
  formatPullRequestUrl,
} = require('../../../integrations/github/helpers');
const { getSinglePullRequest } = require('../../../integrations');
const { singleQuery } = require('../../baseQueries');

const checkUserGithubId = async (url, userId) => {
  const { organization, repo, pullNumber } = formatPullRequestUrl(url);
  const { githubId: id } = await getSinglePullRequest({
    organization,
    pullNumber,
    repo,
  });
  const queryText = `SELECT github_id AS "githubId" FROM users WHERE id = '${userId}'`;
  const { rows } = await singleQuery(queryText);
  const [oneRow] = rows;
  const { githubId } = oneRow;
  return !(githubId === id);
};

module.exports = checkUserGithubId;
