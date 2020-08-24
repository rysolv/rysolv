const { singleItem } = require('../../baseQueries');
const { userReturnValues } = require('./constants');

// GET single user
const getOneUser = async userId => {
  const [rows] = await singleItem('users', userId, userReturnValues);
  if (rows && !rows.isDeleted) {
    return rows;
  }
  throw new Error(`User does not exist`);
};

module.exports = getOneUser;
