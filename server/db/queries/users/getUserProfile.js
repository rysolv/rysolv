const { singleQuery } = require('../../baseQueries');

// Get user profile by user_id
const getUserProfile = async ({ username }) => {
  const queryText = `
  WITH user_data AS (
    SELECT
      l.formatted_address,
      q.question_key,
      u.first_name,
      u.github_link,
      u.id,
      u.last_name,
      u.personal_link,
      u.profile_pic,
      u.stackoverflow_link,
      up.chart_data::jsonb,
      (
        SELECT jsonb_agg(jsonb_build_object('level', pts.level, 'name', t.name) ORDER BY pts.level DESC)
      	FROM users u
		    JOIN position_tech_stack pts on pts.user_id = u.id
    	  JOIN technologies t ON pts.technology_id = t.id
		    WHERE u.username = $1
      ) as skills,
      CASE
        WHEN q.question_key = 'desired_role' THEN qr.response_key
      END AS desired_role,
      CASE
        WHEN q.question_key != 'desired_role' THEN qr.response_key
      END AS question_responses
    FROM users u
    JOIN user_profiles up ON up.user_id = u.id
    JOIN position_tech_stack pts ON pts.user_id = u.id
    JOIN technologies t ON t.id = pts.technology_id
    JOIN locations l ON l.user_id = u.id
    JOIN user_question_responses uqr ON uqr.user_id = u.id
    JOIN question_responses qr ON qr.id = uqr.response_id
    JOIN questions q ON q.id = uqr.question_id
    WHERE u.username = $1
    GROUP BY
      l.formatted_address,
      q.question_key,
      qr.response_key,
      skills,
      u.first_name,
      u.github_link,
      u.id,
      u.last_name,
      u.personal_link,
      u.profile_pic,
      u.stackoverflow_link,
      up.chart_data::jsonb
    )
    SELECT
      ARRAY_AGG(DISTINCT ud.desired_role) FILTER (WHERE ud.desired_role IS NOT NULL) AS "desiredRole",
      JSON_OBJECT_AGG(ud.question_key, ud.question_responses)FILTER (WHERE ud.question_responses IS NOT NULL)::JSONB AS "questionResponses",
      ud.chart_data AS "chartData",
      ud.first_name AS "firstName",
      ud.formatted_address AS "location",
      ud.github_link AS "githubLink",
      ud.id,
      ud.last_name AS "lastName",
      ud.personal_link AS "personalLink",
      ud.profile_pic AS "profilePic",
      ud.skills,
      ud.stackoverflow_link AS "stackoverflowLink"
    FROM user_data ud
    GROUP BY
      ud.chart_data,
      ud.first_name,
      ud.formatted_address,
      ud.github_link,
      ud.id,
      ud.last_name,
      ud.personal_link,
      ud.profile_pic,
      ud.skills,
      ud.stackoverflow_link
  `;
  const { rows } = await singleQuery({ queryText, values: [username] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getUserProfile;
