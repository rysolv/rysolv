const { CustomError } = require('../../../helpers');
const { singleQuery } = require('../../baseQueries');

// Check duplicate user email
const checkDuplicateUserEmail = async ({ email }) => {
  const queryText = `
    SELECT id, email_verified AS "emailVerified", provider
    FROM users
    WHERE email = $1
    AND user_type = 'full'
  `;
  const { rows } = await singleQuery({ queryText, values: [email] });
  const [oneRow] = rows;
  const { emailVerified, provider } = oneRow || {};
  if (oneRow && emailVerified && provider === 'cognito')
    throw new CustomError(`An account with this e-mail already exists.`);
  if (oneRow && emailVerified && provider === 'github')
    throw new CustomError(
      `An account with this e-mail already exists. Try signing in with Github.`,
    );
  if (oneRow && !emailVerified) {
    throw new CustomError(
      `E-mail has not been verified. <a href="/signin" style="text-decoration: underline">Sign in</a> to verify.`,
    );
  }
};

module.exports = checkDuplicateUserEmail;
