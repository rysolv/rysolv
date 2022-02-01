const { singleQuery } = require('../../baseQueries');

// GET single user
const getOneUser = async ({ userId }) => {
  const queryText = `
  WITH skills AS (
    SELECT
      COALESCE(
        jsonb_agg(
          json_build_object('id', pts.id, 'level', pts.level, 'name', t.name) ORDER BY pts.level DESC
        ),
        '{}'
      ) AS skills
    FROM position_tech_stack pts
    JOIN technologies t ON pts.technology_id = t.id
    WHERE pts.user_id = $1
  ),
  question_answers AS (
    SELECT JSONB_OBJECT_AGG(
        q.question_key, COALESCE(uqr.value, qr.value)
    ) AS "userQuestions"
    FROM user_question_responses uqr
    JOIN question_responses qr ON qr.id = uqr.response_id
    JOIN questions q ON q.id = uqr.question_id AND q.category = 'hiring'
    WHERE uqr.user_id = $1
    AND q.question_key != 'desired_role'
  ),
  desired_role as (
    SELECT ARRAY_AGG(qr.value)
    FROM user_question_responses uqr
    JOIN question_responses qr ON qr.id = uqr.response_id
    JOIN questions q ON q.id = uqr.question_id AND q.category = 'hiring'
    WHERE uqr.user_id = $1
    AND q.question_key = 'desired_role'
  )
  SELECT
    (SELECT * FROM desired_role) AS "desiredRole",
    (SELECT * FROM question_answers) AS "questionResponses",
    (SELECT * FROM skills),
    (SELECT COALESCE(ARRAY_AGG(DISTINCT(id)), '{}') FROM issues WHERE contributor_id = u.id AND is_deleted = false) AS "issues",
    ARRAY_REMOVE(ARRAY_AGG(DISTINCT(attempting.user_id)), NULL) AS attempting,
    ARRAY_REMOVE(ARRAY_AGG(DISTINCT(watching.user_id)), NULL) AS watching,
    l.formatted_address AS "location",
    u.balance,
    u.created_date AS "createdDate",
    u.dollars_earned AS "dollarsEarned",
    u.email_verified AS "emailVerified",
    u.email,
    u.first_name AS "firstName",
    u.github_link AS "githubLink",
    u.id,
    u.is_deleted AS "isDeleted",
    u.last_name AS "lastName",
    u.modified_date AS "modifiedDate",
    u.personal_link AS "personalLink",
    u.profile_pic AS "profilePic",
    u.rep,
    u.stackoverflow_link AS "stackoverflowLink",
    u.upvotes,
    u.username
  FROM users u
    LEFT JOIN locations l on l.user_id = u.id
    LEFT JOIN attempting ON attempting.user_id = u.id
    LEFT JOIN watching ON watching.user_id = u.id
  WHERE
    u.id = $1
    AND u.email_verified = true
    AND u.is_deleted = false
    AND u.user_type = 'full'
  GROUP BY
    l.formatted_address,
    u.attempting,
    u.balance,
    u.created_date,
    u.dollars_earned,
    u.email_verified,
    u.email,
    u.first_name,
    u.github_id,
    u.github_link,
    u.github_username,
    u.id,
    u.is_deleted,
    u.last_name,
    u.modified_date,
    u.personal_link,
    u.profile_pic,
    u.provider,
    u.receive_weekly_emails,
    u.rep,
    u.stackoverflow_link,
    u.upvotes,
    u.user_type,
    u.username
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneUser;
