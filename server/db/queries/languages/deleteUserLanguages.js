const { singleQuery } = require('../../baseQueries');

// Remove languages from users table
const deleteUserLanguages = async ({ userId }) => {
  const queryText = `
    DELETE FROM languages WHERE user_id = $1
  `;

  await singleQuery({ queryText, values: [userId] });
};

module.exports = deleteUserLanguages;
