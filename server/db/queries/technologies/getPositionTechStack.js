const { singleQuery } = require('../../baseQueries');

// Return an array of technologies by positionId
const getPositionTechStack = async ({ positionId }) => {
  const queryText = `
    SELECT ARRAY_AGG(DISTINCT(technologies.name)) as technologies FROM technologies
    JOIN position_tech_stack pts ON pts.technology_id = technologies.id
    WHERE pts.position_id = $1
  `;
  const { rows } = await singleQuery({
    queryText,
    values: [positionId],
  });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getPositionTechStack;
