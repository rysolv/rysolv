const { singleQuery } = require('../../baseQueries');

// Return an array of skills
const getSkills = async () => {
  const queryText = `
    SELECT ARRAY_AGG(DISTINCT(name)) as skills
    FROM skills
  `;
  const { rows } = await singleQuery({ queryText });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getSkills;
