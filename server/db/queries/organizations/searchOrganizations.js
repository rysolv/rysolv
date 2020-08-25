const { organizationReturnValues } = require('./constants');
const { singleSearch } = require('../../baseQueries');

// SEARCH organizations
const searchOrganizations = async value => {
  const fields = ['name'];

  const queryText = `SELECT ${organizationReturnValues} FROM organizations`;
  const rows = await singleSearch(queryText, fields, value);
  return rows;
};

module.exports = searchOrganizations;
