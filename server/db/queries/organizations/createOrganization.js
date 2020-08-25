const { formatParamaters } = require('../../helpers');
const { organizationReturnValues, organizationValues } = require('./constants');
const { mapValues } = require('../../baseQueries');

// Create new organization
const createOrganization = async data => {
  const { parameters, substitution, values } = formatParamaters(
    organizationValues,
    data,
  );
  const queryText = `INSERT INTO
    organizations(${parameters})
    VALUES(${substitution})
    RETURNING ${organizationReturnValues}`;
  const result = await mapValues(queryText, [values]);
  return result;
};

module.exports = createOrganization;
