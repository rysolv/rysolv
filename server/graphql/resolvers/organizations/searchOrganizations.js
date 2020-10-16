const { errorLogger } = require('../../../helpers');
const {
  searchOrganizations: searchOrganizationsQuery,
} = require('../../../db');

const searchOrganizations = async ({ value }) => {
  try {
    const organizations = await searchOrganizationsQuery({ value });
    return organizations;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = searchOrganizations;
