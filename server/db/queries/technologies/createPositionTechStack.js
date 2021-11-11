const { singleQuery } = require('../../baseQueries');

// Add technology to table
const createPositionTechStack = async ({ level, positionId, technology }) => {
  const values = [level, positionId, technology];
  const queryText = `
    WITH tech_id as (
      SELECT id FROM technologies
      WHERE short_name = $3
    )
    INSERT INTO
    position_tech_stack(level, position_id, technology_id)
    VALUES(
      $1,
      $2,
      (SELECT id FROM tech_id)
    )
  `;
  await singleQuery({ queryText, values });
};

module.exports = createPositionTechStack;
