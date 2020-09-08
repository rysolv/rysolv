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
    throw new Error(`E-mail already exists`);
  }
  if (oneRow > 0 && !emailVerified) {
    throw new Error(
      `E-mail has not been verified. <a href="/signin" style="text-decoration: underline">Sign in</a> to verify.`,
    );
  }
};

module.exports = checkDuplicateUserEmail;
