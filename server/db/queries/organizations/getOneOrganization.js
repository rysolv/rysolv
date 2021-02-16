const { groupValues, organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET single organization
const getOneOrganization = async ({ organizationId }) => {
  const queryText = `
    SELECT
      ${organizationReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages",
      COALESCE(SUM(payments.funded_amount),0) AS "totalFunded"
    FROM organizations
      LEFT JOIN languages ON languages.organization_id = organizations.id
      LEFT JOIN payments ON payments.organization_id = organizations.id
    WHERE organizations.id = $1
    AND organizations.is_deleted = false
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText, values: [organizationId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneOrganization;
