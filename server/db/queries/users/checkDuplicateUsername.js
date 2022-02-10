const { CustomError } = require('../../../helpers');
const { singleQuery } = require('../../baseQueries');

// Check duplicate username
const checkDuplicateUsername = async ({ username }) => {
  const queryText = `
    SELECT username
    FROM users
    WHERE username = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [username] });
  const [oneRow] = rows;
  const { username: currUsername } = oneRow || {};
  if (oneRow && currUsername) {
    throw new CustomError(`An account with this username already exists.`);
  }
};

module.exports = checkDuplicateUsername;
