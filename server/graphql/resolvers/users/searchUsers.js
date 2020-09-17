const { searchUsers: searchUsersQuery } = require('../../../db');

const searchUsers = async args => {
  const { value } = args;
  try {
    const result = await searchUsersQuery({ value });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = searchUsers;
