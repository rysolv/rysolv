const { singleQuery } = require('../../baseQueries');

// Remove technologies from position_tech_stack table
const deletePositionTechStack = async ({ positionId }) => {
  const queryText = `
    DELETE FROM position_tech_stack WHERE position_id = $1
  `;
  await singleQuery({ queryText, values: [positionId] });
};

module.exports = deletePositionTechStack;
