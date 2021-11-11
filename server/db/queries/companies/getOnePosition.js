const { singleQuery } = require('../../baseQueries');

const getOnePosition = async ({ positionId }) => {
  const queryText = `
    WITH skills AS ( 
      SELECT array_agg(json_build_object('id', pts.id, 'level', pts.level, 'shortName', t.short_name)) AS skills
      FROM position_tech_stack pts
      JOIN technologies t ON pts.technology_id = t.id
      WHERE pts.position_id = $1
    ), positionData AS (
      SELECT json_object_agg(
        q.question_key,  COALESCE(uqr.value, qr.value)
      ) AS "positionData"
      FROM user_question_responses uqr
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      WHERE q.question_key != 'role'
      AND uqr.position_id = $1
    ), role AS (
    SELECT array_agg(
        COALESCE(uqr.value, qr.value)
      ) AS "role"
      FROM user_question_responses uqr
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      WHERE q.question_key = 'role'
      AND uqr.position_id = $1
    )
    SELECT 
      (SELECT * FROM positionData),
      (SELECT * FROM role),
      (SELECT * FROM skills)
  `;
  const { rows } = await singleQuery({ queryText, values: [positionId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOnePosition;
