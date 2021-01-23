const { CustomError } = require('../../../helpers');
const { singleQuery } = require('../../baseQueries');

const checkExistingGithubAccount = async ({ email }) => {
  const queryText = `
    SELECT id, email_verified AS "emailVerified", provider
    FROM users
    WHERE email = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [email] });
  const [oneRow] = rows;
  const { emailVerified, provider } = oneRow || {};
  if (oneRow && emailVerified && provider === 'github')
    throw new CustomError(`Try signing in with Github.`);
};

module.exports = checkExistingGithubAccount;
