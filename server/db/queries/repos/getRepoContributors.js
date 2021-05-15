const { singleQuery } = require('../../baseQueries');

const getRepoContributors = async ({ repoId }) => {
  const queryText = `
    SELECT distinct on(users.id)
      CASE WHEN users.github_id = user_repos.github_id AND user_repos.user_type = 'github_owner' THEN true ELSE false END AS "isOwner",
      issues.id,
      users.first_name AS "firstName",
      users.id,
      users.last_name AS "lastName",
      users.profile_pic AS "profilePic",
      users.username
    FROM users
    LEFT JOIN funding ON funding.user_id = users.id
    LEFT JOIN issues ON issues.repo_id = $1
    LEFT JOIN pullrequests ON pullrequests.issue_id = issues.id AND pullrequests.user_id = users.id
    LEFT JOIN user_repos ON user_repos.repo_id = $1 AND user_repos.user_id = users.id
    WHERE funding.is_approved = true
    AND issues.open = false
    AND pullrequests.is_deleted = false
    AND pullrequests.merged = true
    AND users.email_verified = true	
    AND users.is_deleted = false
    AND users.user_type = 'full'
  `;
  const { rows } = await singleQuery({ queryText, values: [repoId] });
  return rows;
};

module.exports = getRepoContributors;
