const { singleQuery } = require('../../baseQueries');

const checkUserGithubId = async ({ id, userId }) => {
  const queryText = `SELECT github_id AS "githubId" FROM users WHERE id = $1`;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  const { githubId } = oneRow;
  return !(githubId === id);
};

module.exports = checkUserGithubId;
