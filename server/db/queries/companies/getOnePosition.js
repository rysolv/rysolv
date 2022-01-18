const { singleQuery } = require('../../baseQueries');

const getOnePosition = async ({ positionId }) => {
  const queryText = `
    WITH companyId AS (
      SELECT c.id AS "companyId"
      FROM companies c
      JOIN company_positions cp ON cp.company_id = c.id
      WHERE cp.id = $1
    ),
    location AS (
      SELECT json_build_object(
        'country', l.country,
        'countryCode', l.country_code,
        'formattedAddress', l.formatted_address,
        'utcOffset', l.utc_offset_minutes
      ) AS location
      FROM locations l
      WHERE l.position_id = $1
    ),
    positionData AS (
      SELECT json_object_agg(
        q.question_key,  COALESCE(uqr.value, qr.value)
      ) AS "positionData",
      json_object_agg(
        q.question_key,  qr.response_key
      ) AS "positionKeys"
      FROM user_question_responses uqr
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      WHERE q.question_key != 'role'
      AND uqr.position_id = $1
    ),
    role AS (
      SELECT
        array_agg(
          COALESCE(uqr.value, qr.value)
        ) AS "role",
        array_agg(qr.response_key) AS "roleKeys"
      FROM user_question_responses uqr
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      WHERE q.question_key = 'role'
      AND uqr.position_id = $1
    ),
    skills AS (
      SELECT array_agg(json_build_object(
        'id', pts.id,
        'level', pts.level,
        'name', t.name,
        'shortName', t.short_name,
        'language', t.is_language,
        'framework', t.is_framework
      )) AS skills
      FROM position_tech_stack pts
      JOIN technologies t ON pts.technology_id = t.id
      WHERE pts.position_id = $1
    )
    SELECT
      (SELECT * FROM companyId),
      (SELECT * FROM location),
      (SELECT "positionData" FROM positionData),
      (SELECT "positionKeys" FROM positionData),
      (SELECT "role" FROM role),
      (SELECT "roleKeys" from role),
      (SELECT * FROM skills)
  `;
  const { rows } = await singleQuery({ queryText, values: [positionId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOnePosition;
