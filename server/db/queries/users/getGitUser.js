const { singleQuery } = require('../../baseQueries');

// Get git user
const getGitUser = async ({ userId }) => {
  const queryText = `
    SELECT
      gu.github_id AS "githubId",
      gu.github_token AS "githubToken",
      u.github_username AS "githubUsername"
    FROM users u
    JOIN git_users gu ON gu.user_id = u.id
    WHERE u.id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getGitUser;
