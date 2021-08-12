const { singleQuery } = require('../../baseQueries');

// Add userId to user_repos row where githubId matches but there is no userId yet
const assignOwnerToRepo = async ({ githubId, userId }) => {
  const queryText = `
    UPDATE user_repos
    SET user_id = $2
    WHERE github_id = $1
    AND user_id IS NULL
    AND user_type = 'github_owner'
  `;
  await singleQuery({ queryText, values: [githubId, userId] });
};

module.exports = assignOwnerToRepo;
