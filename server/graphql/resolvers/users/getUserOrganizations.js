const { getOrganizationsWhere } = require('../../../db');
const { getUserOrganizationsError } = require('./constants');

const getUserOrganizations = async ({ id }) => {
  try {
    const result = await getOrganizationsWhere({
      column: 'owner_id',
      value: id,
    });
    return result;
  } catch (error) {
    return {
      __typename: 'Error',
      message: getUserOrganizationsError,
    };
  }
};

module.exports = getUserOrganizations;
