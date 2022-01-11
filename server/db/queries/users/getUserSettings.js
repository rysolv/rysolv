const { singleQuery } = require('../../baseQueries');
const { groupValues, userSettingsReturnValues } = require('./constants');

const getUserSettings = async ({ userId }) => {
  const queryText = `
    WITH skills AS (
      SELECT COALESCE(array_agg(json_build_object('id', pts.id, 'level', pts.level, 'name', t.name)), '{}') AS skills
      FROM position_tech_stack pts
      JOIN technologies t ON pts.technology_id = t.id
      WHERE pts.user_id = $1
    )
    SELECT
      ${userSettingsReturnValues},
      (SELECT * FROM skills)
    FROM users
    WHERE
      users.id = $1
      AND users.is_deleted = false
      AND users.user_type = 'full'
    GROUP BY ${groupValues}
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserSettings;
