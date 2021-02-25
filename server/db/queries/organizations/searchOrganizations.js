const { groupValues, organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// SEARCH organizations
const searchOrganizations = async ({ value }) => {
  const queryText = `
    SELECT ${organizationReturnValues},
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
