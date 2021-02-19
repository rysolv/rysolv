const { singleQuery } = require('../../baseQueries');

// Return an array of user languages
const getUserLanguages = async ({ userId }) => {
  const queryText = `
    SELECT ARRAY_AGG(DISTINCT(language)) as languages
    FROM languages
    WHERE user_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserLanguages;
