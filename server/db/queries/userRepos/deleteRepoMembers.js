const { singleQuery } = require('../../baseQueries');

const deleteRepoMembers = async ({ userId }) => {
  const queryText = `
    UPDATE user_repos
    SET user_id = null
    WHERE user_id = $1
    AND user_type = 'github_owner'
  `;

  await singleQuery({ queryText, values: [userId] });
};

module.exports = deleteRepoMembers;
