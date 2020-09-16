const {
  nsearchOrganizations: searchOrganizationsQuery,
} = require('../../../db');

const searchOrganizations = async args => {
  const { value } = args;
  try {
    const result = await searchOrganizationsQuery({ value });
    return {
      __typename: 'OrganizationArray',
      organizationArray: result,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = searchOrganizations;
