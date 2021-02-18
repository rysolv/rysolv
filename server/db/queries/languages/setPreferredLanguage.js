const { singleQuery } = require('../../baseQueries');

// Mark a user's language as preferred in the language table
const setPreferredLanguage = async ({ userId, language }) => {
  const queryText = `
    UPDATE languages
    SET preferred = true
    WHERE user_id = $1 AND language = $2
  `;

  await singleQuery({ queryText, values: [userId, language] });
};

module.exports = setPreferredLanguage;
