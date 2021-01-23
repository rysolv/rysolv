const { singleQuery } = require('../../baseQueries');

const checkGithubIdMatch = async ({ githubId, userId }) => {
  const queryText = `SELECT github_id AS "githubId" FROM users WHERE id = $1`;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  const { githubId: currGithubId } = oneRow;
  return !(githubId === currGithubId);
};

module.exports = checkGithubIdMatch;
