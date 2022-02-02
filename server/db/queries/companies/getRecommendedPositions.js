const { singleQuery } = require('../../baseQueries');

const getRecommendedPositions = async () => {
  const queryText = `
  WITH all_positions as (
    SELECT
      c.company_name,
      c.logo,
      cp.company_id,
      cp.created_date,
      cp.id,
      l.formatted_address,
      q.question_key,
      JSONB_BUILD_OBJECT(
        'name', t.name,
        'level', pts.level
        )
      AS user_languages,
      CASE WHEN q.question_key = 'role' THEN qr.value END AS roles,
      CASE WHEN q.question_key != 'role' THEN max(coalesce(uqr.value, qr.value)) END AS question_responses
    FROM company_positions cp
    JOIN companies c ON c.id = cp.company_id
    JOIN user_question_responses uqr ON uqr.position_id = cp.id
    JOIN locations l on l.position_id = cp.id
    JOIN question_responses qr ON qr.id = uqr.response_id
    JOIN questions q ON q.id = uqr.question_id
    JOIN position_tech_stack pts ON pts.position_id = cp.id
    JOIN technologies t ON pts.technology_id = t.id
    WHERE q.question_key in ('post_to_job_board', 'role', 'salary', 'title')
    GROUP BY
      c.company_name,
      c.logo,
      cp.company_id,
      cp.created_date,
      cp.id,
      l.formatted_address,
      pts.level,
      q.question_key,
      qr.value,
      t.name
    )
    SELECT
      ap.company_id  AS "companyId",
      ap.company_name AS "companyName",
      ap.created_date  AS "createdDate",
      ap.formatted_address AS location,
      ap.id,
      ap.logo AS "companyLogo",
      JSONB_OBJECT_AGG(ap.question_key, ap.question_responses) FILTER (WHERE ap.question_responses IS NOT NULL)::JSONB AS "positionData",
      JSON_AGG(DISTINCT ap.user_languages)::JSONB AS skills,
      ARRAY_AGG(DISTINCT ap.roles) FILTER (WHERE ap.roles IS NOT NULL) AS role
    FROM all_positions ap
    GROUP BY
      ap.company_id,
      ap.company_name,
      ap.created_date,
      ap.formatted_address,
      ap.id,
      ap.logo
    ORDER BY ap.created_date DESC
    LIMIT 3
  `;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getRecommendedPositions;
