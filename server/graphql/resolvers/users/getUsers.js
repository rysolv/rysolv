const { getUsers: getUsersQuery } = require('../../../db');

const getUsers = async () => {
  try {
    const result = await getUsersQuery('users');
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = getUsers;
