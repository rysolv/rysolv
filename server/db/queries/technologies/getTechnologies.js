const { singleQuery } = require('../../baseQueries');

// Return an array of technologies
const getTechnologies = async () => {
  const queryText = `
    SELECT ARRAY_AGG(DISTINCT(name)) as technologies
    FROM technologies
  `;
  const { rows } = await singleQuery({ queryText });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getTechnologies;
