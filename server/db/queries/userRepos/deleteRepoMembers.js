const { singleQuery } = require('../../baseQueries');

const deleteRepoMembers = async ({ githubId }) => {
  const queryText = `
    DELETE FROM user_repos WHERE github_id = $1
  `;

  await singleQuery({ queryText, values: [githubId] });
};

module.exports = deleteRepoMembers;
