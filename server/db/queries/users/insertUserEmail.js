const { v4: uuidv4 } = require('uuid');
const { singleQuery } = require('../../baseQueries');

const insertUserEmails = async ({ email, primary, userId }) => {
  const values = [uuidv4(), email, primary, userId];

  const queryText = `
    INSERT INTO user_emails (id, email, primary_email, user_id)
    VALUES($1, $2, $3, $4);
  `;

  const { rows } = await singleQuery({ queryText, values });
  return rows;
};

module.exports = insertUserEmails;
