const { singleQuery } = require('../../baseQueries');

// Return an array of technologies
const getTechnologies = async () => {
  const queryText = `
    SELECT DISTINCT name AS value, id
    FROM technologies
  `;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getTechnologies;
