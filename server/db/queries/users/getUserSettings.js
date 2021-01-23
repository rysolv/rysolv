const { singleQuery } = require('../../baseQueries');
const { groupValues, userSettingsReturnValues } = require('./constants');

const getUserSettings = async ({ userId }) => {
  const queryText = `
    SELECT
      ${userSettingsReturnValues}
    FROM users
      LEFT JOIN languages ON languages.user_id = users.id
    WHERE
      users.id = $1
      AND users.is_deleted = false
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserSettings;
