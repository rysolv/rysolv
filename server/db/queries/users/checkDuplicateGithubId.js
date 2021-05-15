const { singleQuery } = require('../../baseQueries');

// Check duplicate user github_id
const checkDuplicateGithubId = async ({ githubId }) => {
  const queryText = `
    SELECT id
    FROM users
    WHERE github_id = $1
    AND user_type = 'full'
  `;
  const { rows } = await singleQuery({ queryText, values: [githubId] });
  const [oneRow] = rows;
  const { id } = oneRow || {};
  if (oneRow && id) return { isDuplicateGithubId: true, userId: id };
  return { isDuplicateGithubId: false, userId: id };
};

module.exports = checkDuplicateGithubId;
