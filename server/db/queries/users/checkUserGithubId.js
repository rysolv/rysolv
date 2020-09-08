const {
  formatPullRequestUrl,
} = require('../../../integrations/github/helpers');
const { getSinglePullRequest } = require('../../../integrations');
const { singleQuery } = require('../../baseQueries');

const checkUserGithubId = async ({ htmlUrl, userId }) => {
  const { organization, repo, pullNumber } = formatPullRequestUrl(htmlUrl);
  const { githubId: id } = await getSinglePullRequest({
    organization,
    pullNumber,
    repo,
  });
  const queryText = `SELECT github_id AS "githubId" FROM users WHERE id = $1`;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  const { githubId } = oneRow;
  return !(githubId === id);
};

module.exports = checkUserGithubId;
