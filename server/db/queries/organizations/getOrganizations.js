const { organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all organizations
const getOrganizations = async () => {
  const queryText = `SELECT ${organizationReturnValues} FROM organizations`;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getOrganizations;
