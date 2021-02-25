const { groupValues, organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all organizations
const getOrganizations = async () => {
  const queryText = `
    SELECT
      ${organizationReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(l.language), NULL) AS "preferredLanguages",
      COALESCE(SUM(payments.funded_amount),0) AS "totalFunded"
    FROM organizations
      LEFT JOIN (
        select l.organization_id,
        l.language as language
        from languages l
        group by organization_id, language
      ) l on l.organization_id = organizations.id
      LEFT JOIN payments on payments.organization_id = organizations.id
    WHERE organizations.is_deleted = false
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getOrganizations;
