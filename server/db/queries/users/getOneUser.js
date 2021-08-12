const { singleQuery } = require('../../baseQueries');
const { groupValues, userReturnValues } = require('./constants');

// GET single user
const getOneUser = async ({ userId }) => {
  const queryText = `
    SELECT ${userReturnValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(attempting.user_id)), NULL) AS attempting,
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages",
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(watching.user_id)), NULL) AS watching
    FROM users
      LEFT JOIN attempting ON attempting.user_id = users.id
      LEFT JOIN languages ON languages.user_id = users.id
      LEFT JOIN watching ON watching.user_id = users.id
    WHERE
      users.id = $1
      AND users.email_verified = true
      AND users.is_deleted = false
      AND users.user_type = 'full'
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneUser;
