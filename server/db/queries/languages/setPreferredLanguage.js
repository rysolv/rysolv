const { singleQuery } = require('../../baseQueries');

// Mark a user's language as preferred in the language table
// If the language exists, set preferred to true
// Otherwise add the language with preferred set to true
const setPreferredLanguage = async ({ language, userId }) => {
  const queryText = `
    UPDATE languages
    SET preferred = true
    WHERE user_id = $1 AND language = $2
  `;

  await singleQuery({
    queryText,
    values: [userId, language],
  });
};

module.exports = setPreferredLanguage;
