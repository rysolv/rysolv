const { singleQuery } = require('../../baseQueries');

// Remove technologies from position_tech_stack table
const deleteUserTechStack = async ({ userId }) => {
  const queryText = `
    DELETE FROM position_tech_stack WHERE user_id = $1
  `;
  await singleQuery({ queryText, values: [userId] });
};

module.exports = deleteUserTechStack;
