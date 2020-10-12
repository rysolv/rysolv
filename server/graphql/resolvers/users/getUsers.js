const { getUsers: getUsersQuery } = require('../../../db');
const { getUsersError } = require('./constants');

const getUsers = async () => {
  try {
    const users = await getUsersQuery('users');
    return {
      __typename: 'UserArray',
      users,
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: getUsersError,
    };
  }
};

module.exports = getUsers;
