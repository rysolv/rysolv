const { singleQuery } = require('../../baseQueries');
const { groupValues, userReturnValues } = require('./constants');

// GET single user by username
const getUserByUsername = async ({ username }) => {
  const queryText = `
    SELECT ${userReturnValues}
    FROM users
    WHERE
      users.username = $1
      AND users.email_verified = true
      AND users.is_deleted = false
      AND users.user_type = 'full'
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText, values: [username] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserByUsername;
