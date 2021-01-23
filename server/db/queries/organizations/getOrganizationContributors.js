const { singleQuery } = require('../../baseQueries');

const getOrganizationContributors = async ({ organizationId }) => {
  const queryText = `
    SELECT
      issues.id,
      users.first_name AS "firstName",
      users.id,
      users.last_name AS "lastName",
      users.profile_pic AS "profilePic",
      users.username
    FROM users
    LEFT JOIN funding ON funding.user_id = users.id
    LEFT JOIN issues ON issues.organization_id = $1
    LEFT JOIN pullrequests ON pullrequests.issue_id = issues.id AND pullrequests.user_id = users.id
    WHERE funding.is_approved = true
    AND issues.open = false
    AND pullrequests.is_deleted = false
    AND pullrequests.merged = true
    AND users.email_verified = true	
    AND users.is_deleted = false
  `;
  const { rows } = await singleQuery({ queryText, values: [organizationId] });
  return rows;
};

module.exports = getOrganizationContributors;
