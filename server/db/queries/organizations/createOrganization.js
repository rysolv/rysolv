const { formatParameters } = require('../../helpers');
const { organizationReturnValues, organizationValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// Create new organization
const createOrganization = async ({ data }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: organizationValues,
  });
  const queryText = `INSERT INTO
    organizations(${parameters})
    VALUES(${substitution})
    RETURNING ${organizationReturnValues}`;

  const { rows } = await singleQuery({ queryText, values });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = createOrganization;
