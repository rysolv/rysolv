const { errorLogger } = require('../../../helpers');
const { getUsers: getUsersQuery } = require('../../../db');
const { getUsersError } = require('./constants');

const getUsers = async () => {
  try {
    const users = await getUsersQuery();
    return {
      __typename: 'UserArray',
      users,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: getUsersError,
    };
  }
};

module.exports = getUsers;
