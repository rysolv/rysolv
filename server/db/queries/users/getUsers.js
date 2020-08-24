const { groupValues, userReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all users
const getUsers = async () => {
  const queryText = `
    SELECT ${userReturnValues}, ARRAY_AGG(watching.issue_id) AS watching FROM users
    LEFT JOIN watching on watching.user_id = users.id
    WHERE is_deleted = false AND email_verified = true
    GROUP BY ${groupValues}`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = getUsers;
