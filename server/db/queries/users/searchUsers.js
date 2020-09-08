const { userReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// SEARCH users
const searchUsers = async ({ value }) => {
  const queryText = `
    SELECT ${userReturnValues} FROM users
    WHERE
    LOWER(users.first_name) LIKE LOWER('%'||$1||'%') OR
    LOWER(users.last_name) LIKE LOWER('%'||$1||'%') OR
    LOWER(users.username) LIKE LOWER('%'||$1||'%') AND
    is_deleted = false
  `;
  const { rows } = await singleQuery({ queryText, values: [value] });
  return rows;
};

module.exports = searchUsers;
