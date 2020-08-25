const { singleQuery } = require('../../baseQueries');

// Check duplicate user email
const checkDuplicateUserEmail = async email => {
  const queryText = `
    SELECT id, email_verified AS "emailVerified" FROM users WHERE email='${email}'
  `;
  const { rows } = await singleQuery({ queryText });
  const [result] = rows;
  const { emailVerified } = result || {};
  if (rows.length > 0 && emailVerified) {
    throw new Error(`E-mail already exists`);
  }
  if (rows.length > 0 && !emailVerified) {
    throw new Error(
      `E-mail has not been verified. <a href="/signin" style="text-decoration: underline">Sign in</a> to verify.`,
    );
  }
};

module.exports = checkDuplicateUserEmail;
