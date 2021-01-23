const { groupValues, userReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all users
const getUsers = async () => {
  const queryText = `
    SELECT
      ${userReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(attempting.issue_id)), NULL) AS attempting
    FROM users
      LEFT JOIN attempting ON attempting.user_id = users.id
      LEFT JOIN languages ON languages.user_id = users.id
    WHERE is_deleted = false AND email_verified = true
    GROUP BY ${groupValues}`;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getUsers;
