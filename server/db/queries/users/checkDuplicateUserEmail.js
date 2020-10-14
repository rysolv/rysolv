const { singleQuery } = require('../../baseQueries');

// Check duplicate user email
const checkDuplicateUserEmail = async ({ email }) => {
  const queryText = `
    SELECT id, email_verified AS "emailVerified"
    FROM users
    WHERE email = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [email] });
  const [oneRow] = rows;
  const { emailVerified } = oneRow || {};
  if (oneRow && emailVerified) {
    const error = new Error();
    error.message = `E-mail already exists.`;
    throw error;
  }
  if (oneRow && !emailVerified) {
    const error = new Error();
    error.message = `E-mail has not been verified. <a href="/signin" style="text-decoration: underline">Sign in</a> to verify.`;
    throw error;
  }
};

module.exports = checkDuplicateUserEmail;
