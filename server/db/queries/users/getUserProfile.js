const { singleQuery } = require('../../baseQueries');

// Get user profile by user_id
const getUserProfile = async ({ username }) => {
  const queryText = `
  WITH user_id AS (
    SELECT id FROM users WHERE username = $1
    LIMIT 1
  ),
  user_data AS (
    SELECT
    JSONB_BUILD_OBJECT (
        'company', CASE WHEN uc.company_id IS NOT NULL THEN true ELSE false END,
        'firstName', u.first_name,
        'githubId', u.github_id,
        'githubLink', u.github_link,
        'id', u.id,
        'lastName', u.last_name,
        'location', l.formatted_address,
        'personalLink', u.personal_link,
        'profilePic', u.profile_pic,
        'stackoverflowLink', u.stackoverflow_link
    ) AS "userData"
    FROM users u
    LEFT JOIN locations l ON l.user_id = u.id
    LEFT JOIN user_companies uc ON uc.user_id = u.id
    WHERE u.id = (SELECT id FROM user_id)
  ),
  profile_data AS (
    SELECT up.chart_data::jsonb AS "chartData"
    FROM user_profiles up
    WHERE up.user_id = (SELECT id FROM user_id)
  ),
  skills AS (
    SELECT
    JSONB_AGG(
      JSONB_BUILD_OBJECT('level', pts.level, 'name', t.name)
      ORDER BY pts.level DESC
    ) AS "skills"
    FROM position_tech_stack pts
    JOIN technologies t ON pts.technology_id = t.id
    WHERE pts.user_id = (SELECT id FROM user_id)
  ),
  survey_data AS (
    SELECT jsonb_object_agg(q.question_key, qr.response_key) AS "questionResponses"
    FROM user_question_responses uqr
    JOIN question_responses qr ON qr.id = uqr.response_id
    JOIN questions q ON q.id = uqr.question_id
    WHERE uqr.user_id = (SELECT id FROM user_id)
    AND q.question_key != 'desired_role'
  ),
  desired_role AS (
    SELECT array_agg(qr.value) AS "desiredRole"
    FROM user_question_responses uqr
    JOIN question_responses qr ON qr.id = uqr.response_id
    JOIN questions q ON q.id = uqr.question_id
    WHERE uqr.user_id = (SELECT id FROM user_id)
    AND q.question_key = 'desired_role'
  )
  SELECT
    (SELECT * FROM user_data),
    (SELECT * FROM profile_data),
    (SELECT * FROM skills),
    (SELECT * FROM survey_data),
    (SELECT * FROM desired_role)
  `;
  const { rows } = await singleQuery({ queryText, values: [username] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserProfile;
