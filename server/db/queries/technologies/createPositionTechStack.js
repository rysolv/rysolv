const { v4: uuidv4 } = require('uuid');

const { singleQuery } = require('../../baseQueries');

// Add technology to table
const createPositionTechStack = async ({ level, positionId, technologyId }) => {
  const values = [uuidv4(), level, positionId, technologyId];
  const queryText = `
    INSERT INTO
    position_tech_stack(id, level, position_id, technology_id)
    VALUES($1, $2, $3, $4)
  `;
  await singleQuery({ queryText, values });
};

module.exports = createPositionTechStack;
