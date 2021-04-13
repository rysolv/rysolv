const { v4: uuidv4 } = require('uuid');

const { singleQuery } = require('../../baseQueries');

const addRepoMembers = async ({ members }) => {
  members.map(async member => {
    const values = [uuidv4(), member.githubId, member.repoId, member.userType];

    const queryText = `
      INSERT INTO
      user_repos(id, github_id, repo_id, user_id, user_type)
      VALUES(
        $1,
        $2,
        $3,
        (SELECT u.id FROM users u WHERE u.github_id = $2),
        $4
      )
    `;

    await singleQuery({ queryText, values });
  });
};

module.exports = addRepoMembers;
