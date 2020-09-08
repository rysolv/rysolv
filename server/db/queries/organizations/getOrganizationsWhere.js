const { organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// Search organizations by a single column
const getOrganizationsWhere = async ({ column, value }) => {
  const queryText = `SELECT ${organizationReturnValues} FROM organizations WHERE ${column} = $1`;
  const { rows } = await singleQuery({
    queryText,
    values: [value],
  });
  return rows;
};

module.exports = getOrganizationsWhere;
