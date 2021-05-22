const { groupValues, userReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// SEARCH users
const searchUsers = async ({ value }) => {
  const queryText = `
    SELECT
      ${userReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(attempting.issue_id)), NULL) AS attempting,
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages"
    FROM users
      LEFT JOIN attempting ON attempting.user_id = users.id
      LEFT JOIN languages ON languages.user_id = users.id
    WHERE
      is_deleted = false AND email_verified = true AND user_type = 'full' AND
      (
        LOWER(users.first_name) LIKE LOWER('%'||$1||'%') OR
        LOWER(users.last_name) LIKE LOWER('%'||$1||'%') OR
        LOWER(users.username) LIKE LOWER('%'||$1||'%')
      )
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText, values: [value] });
  return rows;
};

module.exports = searchUsers;
