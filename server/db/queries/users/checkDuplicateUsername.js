const { singleQuery } = require('../../baseQueries');

// Check duplicate username
const checkDuplicateUsername = async ({ username }) => {
  const queryText = `
    SELECT id FROM users
    WHERE username = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [username] });
  if (rows.length > 0) {
    const error = new Error();
    error.message = `Username ${username} already exists.`;
    throw error;
  }
};

module.exports = checkDuplicateUsername;
