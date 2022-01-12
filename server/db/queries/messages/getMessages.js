const { singleQuery } = require('../../baseQueries');

// @TODO: Locations
// Remove 'left' from join on locations
const getMessages = async ({ userId }) => {
  const queryText = `
  WITH messages AS (
    WITH threads AS (
      SELECT DISTINCT(m.thread_id)
      FROM messages m
      WHERE m.from_user_id = $1
      OR m.to_user_id = $1
    )
    SELECT
    m.thread_id AS "threadId",
    MAX (m.created_date) AS "lastMessageDate",
    (
      SELECT
        json_object_agg(q.question_key,  COALESCE(uqr.value, qr.value))::jsonb
        ||
        json_build_object('positionId', m.position_id)::jsonb
      FROM user_question_responses uqr
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      AND uqr.position_id = m.position_id
      WHERE q.category = 'company_position'
    ) AS position,
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'body', m.body,
        'createdDate', m.created_date,
        'firstName', u.first_name,
        'id', m.id,
        'lastName', u.last_name,
        'profilePic', u.profile_pic,
        'readDate', m.read_date,
        'userId', u.id,
        'username', u.username
      )
      ORDER BY m.created_date
    ) AS messages,
    JSONB_BUILD_OBJECT(
      'companyUrl', c.company_url,
      'description', c.description,
      'location', l.formatted_address,
      'logo', c.logo,
      'name', c.company_name,
      'size', c.size
    ) AS company,
    JSON_BUILD_OBJECT (
      'username', candidate_user.username,
      'firstName', candidate_user.first_name,
      'lastName', candidate_user.last_name,
      'profilePic', candidate_user.profile_pic,
      'userId', candidate_user.id
    ) as candidate
    FROM messages m
    JOIN users u ON m.from_user_id = u.id
    JOIN users candidate_user -- DOUBLE USER JOIN WOOOOO!
      ON candidate_user.id IN (m.from_user_id, m.to_user_id)
      AND candidate_user.id != $1
    JOIN company_positions cp ON cp.id = m.position_id
    JOIN companies c ON c.id = cp.company_id
    LEFT JOIN locations l on l.company_id = c.id
    WHERE thread_id IN (SELECT thread_id FROM threads)
    GROUP BY
      c.company_name,
      c.company_url,
      c.description,
      c.logo,
      c.size,
      candidate_user.first_name,
      candidate_user.id,
      candidate_user.last_name,
      candidate_user.profile_pic,
      candidate_user.username,
      l.formatted_address,
      m.position_id,
      m.thread_id
    ORDER BY "lastMessageDate" DESC
  )
  SELECT * FROM messages
	WHERE position IS NOT NULL
	AND messages IS NOT NULL
	AND company IS NOT NULL
	AND candidate IS NOT NULL
  `;

  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = getMessages;
