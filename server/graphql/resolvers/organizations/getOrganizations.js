const { getOrganizations: getOrganizationsQuery } = require('../../../db');
const { getOrganizationsError } = require('./constants');

const getOrganizations = async () => {
  try {
    const organizations = await getOrganizationsQuery();
    return {
      __typename: 'OrganizationArray',
      organizations,
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: getOrganizationsError,
    };
  }
};

module.exports = getOrganizations;
