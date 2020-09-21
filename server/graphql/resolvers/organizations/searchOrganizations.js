const {
  searchOrganizations: searchOrganizationsQuery,
} = require('../../../db');

const searchOrganizations = async ({ value }) => {
  try {
    const organizations = await searchOrganizationsQuery({ value });
    return organizations;
  } catch (error) {
    return [];
  }
};

module.exports = searchOrganizations;
