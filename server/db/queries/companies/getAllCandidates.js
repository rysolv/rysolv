const { singleQuery } = require('../../baseQueries');

const getAllCandidates = async () => {
  const queryText = `
    WITH candidates AS (
      SELECT
        JSON_BUILD_OBJECT(
          'country', l.country,
          'countryCode', l.country_code,
          'formattedAddress', l.formatted_address,
          'utcOffset', l.utc_offset_minutes
        )::jsonb AS location,
        u.id,
        u.first_name,
        q.question_key,
        JSONB_BUILD_OBJECT(
          'shortName', t.short_name,
          'level', pts.level,
          'framework', t.is_framework,
          'language', t.is_language
        ) AS user_languages,
        CASE
          WHEN q.question_key = 'desired_role' THEN qr.response_key
        END AS desired_role,
        CASE
          WHEN q.question_key = 'type' THEN qr.response_key
        END AS type,
        CASE
          WHEN q.question_key != 'desired_role' AND q.question_key != 'type' THEN MAX(qr.response_key)
        END AS question_responses
      FROM users u
        JOIN locations l on l.user_id = u.id
        JOIN position_tech_stack pts ON pts.user_id = u.id
        JOIN technologies t ON pts.technology_id = t.id
        JOIN user_question_responses uqr on uqr.user_id = u.id
        JOIN question_responses qr ON qr.id = uqr.response_id
        JOIN questions q ON q.id = uqr.question_id AND q.category = 'hiring'
      GROUP BY
        l.country_code,
        l.country,
        l.formatted_address,
        l.utc_offset_minutes,
        pts.level,
        q.question_key,
        qr.response_key,
        t.is_framework,
        t.is_language,
        t.short_name,
        u.first_name,
        u.id,
        u.last_name
    )
    SELECT
      c.first_name,
      c.id,
      c.location AS "userLocation",
      JSON_OBJECT_AGG(c.question_key, c.question_responses)FILTER (WHERE c.question_responses IS NOT NULL)::JSONB AS "userResponses",
      JSON_AGG(DISTINCT c.user_languages)::JSONB AS "userLanguages",
      ARRAY_AGG(DISTINCT c.desired_role) FILTER (WHERE c.desired_role IS NOT NULL) AS "userRoles",
      ARRAY_AGG(DISTINCT c.type) FILTER (WHERE c.type IS NOT NULL) AS "userType"
    FROM candidates c
    GROUP BY
      c.first_name,
      c.id,
      c.location
  `;

  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getAllCandidates;
