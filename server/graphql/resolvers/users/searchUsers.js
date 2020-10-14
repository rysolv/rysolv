const { searchUsers: searchUsersQuery } = require('../../../db');

const searchUsers = async ({ value }) => {
  try {
    const users = await searchUsersQuery({ value });
    return users;
  } catch (error) {
    return [];
  }
};

module.exports = searchUsers;
