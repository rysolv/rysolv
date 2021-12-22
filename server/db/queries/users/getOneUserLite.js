const { singleQuery } = require('../../baseQueries');

// GET single user
const getOneUserLite = async ({ userId }) => {
  const queryText = `
    SELECT
      email,
      first_name AS "firstName",
      last_name AS "lastName",
      username
    FROM users
    WHERE
      users.id = $1
      AND users.email_verified = true
      AND users.is_deleted = false
      AND users.user_type = 'full'
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneUserLite;
