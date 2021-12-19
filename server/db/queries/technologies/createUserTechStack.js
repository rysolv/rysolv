const { singleQuery } = require('../../baseQueries');

// Add technology to table
const createUserTechStack = async ({ level, technology, userId }) => {
  const values = [level, technology, userId];
  const queryText = `
    WITH tech_id as (
      SELECT id FROM technologies
      WHERE short_name = $2
    )
    INSERT INTO
    position_tech_stack(level, technology_id, user_id)
    VALUES(
      $1,
      (SELECT id FROM tech_id),
      $3
    )
  `;
  await singleQuery({ queryText, values });
};

module.exports = createUserTechStack;
