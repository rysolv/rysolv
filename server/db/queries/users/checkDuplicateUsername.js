const { singleQuery } = require('../../baseQueries');

// Check duplicate username
const checkDuplicateUsername = async username => {
  const queryText = `
    SELECT id FROM users WHERE (username='${username}')
  `;
  const { rows } = await singleQuery({ queryText });
  if (rows.length > 0) {
    throw new Error(`Username ${username} already exists`);
  }
};

module.exports = checkDuplicateUsername;
