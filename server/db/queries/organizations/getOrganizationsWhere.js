const { organizationReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all organizations
const getOrganizationsWhere = async (column, value) => {
  const queryText = `SELECT ${organizationReturnValues} FROM organizations WHERE (${column}='${value}')`;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getOrganizationsWhere;
