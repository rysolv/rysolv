const { groupValues, organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// Search organizations by a single column
const getOrganizationsWhere = async ({ column, value }) => {
  const queryText = `
    SELECT ${organizationReturnValues} FROM organizations
      LEFT JOIN languages ON languages.organization_id = organizations.id
    WHERE ${column} = $1
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({
    queryText,
    values: [value],
  });
  return rows;
};

module.exports = getOrganizationsWhere;
