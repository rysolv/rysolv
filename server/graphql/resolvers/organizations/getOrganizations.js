const { getOrganizations: getOrganizationsQuery } = require('../../../db');

const getOrganizations = async () => {
  try {
    const result = await getOrganizationsQuery();
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = getOrganizations;
