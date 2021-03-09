const { groupValues, organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET single organization
const getOneOrganization = async ({ organizationId }) => {
  const queryText = `
    SELECT
      ${organizationReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(user_repos.github_id)), NULL) AS "githubOwners",
      (SELECT COALESCE(SUM(funded_amount),0) FROM payments WHERE organization_id = $1) as "totalFunded"
    FROM organizations
      LEFT JOIN languages ON languages.organization_id = organizations.id
      LEFT JOIN user_repos ON user_repos.repo_id = organizations.id
    WHERE organizations.id = $1
    AND organizations.is_deleted = false
    AND user_repos.user_type = 'github_owner'
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText, values: [organizationId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneOrganization;
