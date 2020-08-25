const { userReturnValues } = require('./constants');
const { singleSearch } = require('../../baseQueries');
// SEARCH users
const searchUsers = async (table, value) => {
  const fields = ['first_name', 'last_name', 'username'];
  const queryText = `SELECT ${userReturnValues} FROM ${table}`;
  const param = 'is_deleted = false';
  const rows = await singleSearch(queryText, fields, value, param);
  return rows;
};

module.exports = searchUsers;
