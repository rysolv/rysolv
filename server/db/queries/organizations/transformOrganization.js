const { formatParamaters } = require('../../helpers');
const { organizationReturnValues, organizationValues } = require('./constants');
const { mapValues, singleItem } = require('../../baseQueries');

// TRANSFORM single Organization
const transformOrganization = async (id, data) => {
  const [rows] = await singleItem('organizations', id, organizationValues);
  if (rows) {
    const { parameters, substitution, values } = formatParamaters(
      organizationValues,
      data,
    );

    const queryText = `UPDATE organizations
      SET (${parameters})
      = (${substitution})
      WHERE (id = '${id}')
      RETURNING ${organizationReturnValues}`;
    const [result] = await mapValues(queryText, values);
    return result;
  }
  throw new Error(`Failed to update. ID not found in organizations`);
};

module.exports = transformOrganization;
