const { singleQuery } = require('../../baseQueries');

const getUserResponse = async ({ userId }) => {
  const queryText = `
    WITH desiredRole AS (
      SELECT
        array_agg(
          COALESCE(uqr.value, qr.value)
        ) AS "desiredRole"
      FROM user_question_responses uqr
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      WHERE q.question_key = 'desired_role'
      AND uqr.user_id = $1
    ),
    preferredLocation AS (
      SELECT json_build_object(
        'country', l.country,
        'countryCode', l.country_code,
        'formattedAddress', l.formatted_address,
        'utcOffset', l.utc_offset_minutes
      ) AS "preferredLocation"
      FROM locations l
      WHERE l.user_id = $1
    ),
    skills AS (
      SELECT COALESCE(array_agg(json_build_object('id', pts.id, 'level', pts.level, 'name', t.name)), '{}') AS skills
      FROM position_tech_stack pts
      JOIN technologies t ON pts.technology_id = t.id
      WHERE pts.user_id = $1
    ),
    type AS (
      SELECT
        array_agg(
          COALESCE(uqr.value, qr.value)
        ) AS "type"
      FROM user_question_responses uqr
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      WHERE q.question_key = 'type'
      AND uqr.user_id = $1
    ),
    userData AS (
      SELECT json_object_agg(
        q.question_key,  COALESCE(uqr.value, qr.value)
      ) AS "userData"
      FROM user_question_responses uqr
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      WHERE q.category = 'hiring'
      AND q.question_key != 'desired_role'
      AND q.question_key != 'type'
      AND uqr.user_id = $1
    )
    SELECT
      (SELECT * FROM desiredRole),
      (SELECT * FROM preferredLocation),
      (SELECT * FROM skills),
      (SELECT * FROM type),
      (SELECT * FROM userData)
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserResponse;
