const { singleQuery } = require('../../baseQueries');

// GET single user in the process of signing up
const getOneUserSignUp = async ({ email }) => {
  const queryText = `
    SELECT id, email, username
    FROM users
    WHERE is_deleted = false AND email = $1`;
  const { rows } = await singleQuery({ queryText, values: [email] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneUserSignUp;
