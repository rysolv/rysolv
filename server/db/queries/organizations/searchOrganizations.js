const { organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// SEARCH organizations
const searchOrganizations = async ({ value }) => {
  const queryText = `
    SELECT ${organizationReturnValues} FROM organizations
    WHERE
    LOWER(organizations.name) LIKE LOWER('%'||$1||'%') OR
    LOWER(organizations.description) LIKE LOWER('%'||$1||'%')`;

  const { rows } = await singleQuery({ queryText, values: [value] });
  return rows;
};

module.exports = searchOrganizations;
