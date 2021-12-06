const { singleQuery } = require('../../baseQueries');

const getUserPreferredLanguages = async ({ userId }) => {
  const queryText = `
    SELECT ARRAY_AGG(DISTINCT(language)) as languages
    FROM languages
    WHERE preferred = true
    AND user_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserPreferredLanguages;
