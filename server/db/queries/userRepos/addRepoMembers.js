const { v4: uuidv4 } = require('uuid');

const { singleQuery } = require('../../baseQueries');

const addRepoMembers = async ({ owners }) => {
  owners.map(async owner => {
    const values = [
      uuidv4(),
      owner.githubId,
      owner.repoId,
      owner.userId || null,
      owner.userType,
    ];

    const queryText = `
      INSERT INTO
      user_repos(id, github_id, repo_id, user_id, user_type)
      VALUES($1, $2, $3, $4, $5, $6)
    `;

    await singleQuery({ queryText, values });
  });
};

module.exports = addRepoMembers;
