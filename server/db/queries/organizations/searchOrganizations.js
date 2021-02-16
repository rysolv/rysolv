const { groupValues, organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// SEARCH organizations
const searchOrganizations = async ({ value }) => {
  const queryText = `
    SELECT ${organizationReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages",
      COALESCE(SUM(payments.funded_amount),0) AS "totalFunded"
    FROM organizations
      LEFT JOIN languages ON languages.organization_id = organizations.id
      LEFT JOIN payments ON payments.organization_id = organizations.id
    WHERE
      organizations.is_deleted = false AND
      (
        LOWER(organizations.name) LIKE LOWER('%'||$1||'%') OR
        LOWER(organizations.description) LIKE LOWER('%'||$1||'%')
      )
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText, values: [value] });
  return rows;
};

module.exports = searchOrganizations;
