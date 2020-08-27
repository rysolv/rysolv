const { organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET single organization
const getOneOrganization = async ({ organizationId }) => {
  const queryText = `SELECT ${organizationReturnValues} FROM organizations WHERE id = $1`;
  const { rows } = await singleQuery({ queryText, values: [organizationId] });
  if (rows) {
    const [oneRow] = rows;
    return oneRow;
  }
  throw new Error(`ID not found in organizations`);
};

module.exports = getOneOrganization;
