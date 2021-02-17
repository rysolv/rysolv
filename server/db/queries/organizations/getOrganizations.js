const { groupValues, organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all organizations
const getOrganizations = async () => {
  const queryText = `
    SELECT
      ${organizationReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages",
      COALESCE(SUM(DISTINCT payments.funded_amount),0) AS "totalFunded"
    FROM organizations
      LEFT JOIN languages ON languages.organization_id = organizations.id
      LEFT JOIN payments ON payments.organization_id = organizations.id
    WHERE organizations.is_deleted = false
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getOrganizations;
