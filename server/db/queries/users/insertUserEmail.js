const { singleQuery } = require('../../baseQueries');

const insertUserEmails = async ({ email, primary, userId }) => {
  const values = [email, primary, userId];

  const queryText = `
    INSERT INTO user_emails (email, primary_email, user_id)
    VALUES($1, $2, $3);
  `;

  const { rows } = await singleQuery({ queryText, values });
  return rows;
};

module.exports = insertUserEmails;
