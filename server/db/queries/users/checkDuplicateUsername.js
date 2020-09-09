const { singleQuery } = require('../../baseQueries');

// Check duplicate username
const checkDuplicateUsername = async ({ username }) => {
  const queryText = `
    SELECT id FROM users
    WHERE username = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [username] });
  if (rows.length > 0) {
    throw new Error(`Username ${username} already exists`);
  }
};

module.exports = checkDuplicateUsername;
