const { groupValues, organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all organizations
const getOrganizations = async () => {
  const queryText = `
    SELECT
      ${organizationReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages"
    FROM organizations
    LEFT JOIN languages ON languages.organization_id = organizations.id
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getOrganizations;
