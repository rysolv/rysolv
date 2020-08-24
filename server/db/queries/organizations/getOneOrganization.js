const { organizationReturnValues } = require('./constants');
const { singleItem } = require('../../baseQueries');

// GET single organization
const getOneOrganization = async id => {
  const rows = await singleItem('organizations', id, organizationReturnValues);
  if (rows) {
    return rows;
  }
  throw new Error(`ID not found in organizations`);
};

module.exports = getOneOrganization;
