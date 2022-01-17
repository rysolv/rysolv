const { singleQuery } = require('../../baseQueries');

// Add technology to table
const createUserTechStack = async ({ level, technology, userId }) => {
  const values = [level, technology, userId];
  const queryText = `
    WITH tech_id as (
      SELECT t.id FROM technologies t
      WHERE t.name = $2
    )
    INSERT INTO
    position_tech_stack(level, technology_id, user_id)
    VALUES(
      $1,
      (SELECT id FROM tech_id),
      $3
    )
    ON CONFLICT (user_id, technology_id)
    DO UPDATE SET level = EXCLUDED.level
  `;
  await singleQuery({ queryText, values });
};

module.exports = createUserTechStack;
