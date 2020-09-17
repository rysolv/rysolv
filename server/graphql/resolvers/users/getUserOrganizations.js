const { getOrganizationsWhere } = require('../../../db');

const getUserOrganizations = async args => {
  const { id } = args;
  try {
    const result = await getOrganizationsWhere({
      column: 'owner_id',
      value: id,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = getUserOrganizations;
