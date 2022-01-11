const { singleQuery } = require('../../baseQueries');

const getAllCandidates = async () => {
  const queryText = `
    WITH candidates AS (
      SELECT
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
          WHEN q.question_key != 'desired_role' THEN MAX(qr.response_key)
        END AS question_responses
      FROM users u
        JOIN position_tech_stack pts ON pts.user_id = u.id
        JOIN technologies t ON pts.technology_id = t.id
        JOIN user_question_responses uqr on uqr.user_id = u.id
        JOIN question_responses qr ON qr.id = uqr.response_id
        JOIN questions q ON q.id = uqr.question_id AND q.category = 'hiring'
      GROUP BY
        u.id,
        u.first_name,
        u.last_name,
        q.question_key,
        qr.response_key,
        t.short_name, pts.level, t.is_framework, t.is_language
    )
    SELECT
      c.id,
      c.first_name,
      JSON_OBJECT_AGG(c.question_key, c.question_responses)::JSONB AS "userResponses",
      JSON_AGG(DISTINCT c.user_languages)::JSONB AS "userLanguages",
      ARRAY_AGG(DISTINCT c.desired_role) FILTER (WHERE c.desired_role IS NOT NULL) AS "userRoles"
    FROM candidates c
    GROUP BY c.id, c.first_name
  `;

  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getAllCandidates;
