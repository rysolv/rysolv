const { singleQuery } = require('../../baseQueries');

// GET one technology
const getOneTechnology = async ({ technology }) => {
  const queryText = `
    SELECT
      id AS "technologyId",
      is_framework AS "isFramework",
      is_language AS "isLanguage",
      name,
      short_name
    FROM technologies
    WHERE short_name = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [technology] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneTechnology;
