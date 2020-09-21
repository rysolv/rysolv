const {
  searchOrganizations: searchOrganizationsQuery,
} = require('../../../db');

const searchOrganizations = async ({ value }) => {
  try {
    const organizations = await searchOrganizationsQuery({ value });
    return {
      __typename: 'OrganizationArray',
      organizations,
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: error.message,
    };
  }
};

module.exports = searchOrganizations;
