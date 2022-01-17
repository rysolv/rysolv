const { singleQuery } = require('../../baseQueries');

// Return an array of technologies by userId
const getUserTechStack = async ({ userId }) => {
  const queryText = `
    SELECT COALESCE(array_agg(json_build_object('id', pts.id, 'level', pts.level, 'name', t.name)), '{}') AS skills
    FROM position_tech_stack pts
    JOIN technologies t ON pts.technology_id = t.id
    WHERE pts.user_id = $1
  `;
  const { rows } = await singleQuery({
    queryText,
    values: [userId],
  });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserTechStack;
