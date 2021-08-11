const { singleQuery } = require('../../baseQueries');

const insertGitUser = async ({ githubId, githubToken, userId }) => {
  const values = [githubId, githubToken, userId];

  const queryText = `
    INSERT INTO git_users (github_id, github_token, user_id)
    VALUES($1, $2, $3)
    ON CONFLICT (github_id) DO UPDATE
    SET github_token = EXCLUDED.github_token;
  `;

  const { rows } = await singleQuery({ queryText, values });
  return rows;
};

module.exports = insertGitUser;
