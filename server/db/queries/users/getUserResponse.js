const { singleQuery } = require('../../baseQueries');

const getUserResponse = async ({ userId }) => {
  const queryText = `
    WITH skills AS ( 
      SELECT COALESCE(array_agg(json_build_object('id', pts.id, 'level', pts.level, 'shortName', t.short_name)), '{}') AS skills
      FROM position_tech_stack pts
      JOIN technologies t ON pts.technology_id = t.id
      WHERE pts.user_id = $1
    ), userData AS (
      SELECT json_object_agg(
        q.question_key,  COALESCE(uqr.value, qr.value)
      ) AS "userData"
      FROM user_question_responses uqr
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      WHERE q.category = 'hiring'
      AND q.question_key != 'desired_role'
      AND uqr.user_id = $1
    ),
    desiredRole AS (
      SELECT
        array_agg(
          COALESCE(uqr.value, qr.value)
        ) AS "desiredRole"
      FROM user_question_responses uqr
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      WHERE q.question_key = 'desired_role'
      AND uqr.user_id = $1
    )
    SELECT 
      (SELECT * FROM userData),
      (SELECT * FROM desiredRole),
      (SELECT * FROM skills)
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserResponse;
