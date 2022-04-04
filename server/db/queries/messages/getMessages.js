const { singleQuery } = require('../../baseQueries');

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
        m.thread_id,
        MAX (m.created_date) as last_message_date,
        (
          SELECT
            json_object_agg(q.question_key,  COALESCE(uqr.value, qr.value))::jsonb
            ||
            json_build_object('positionId', m.position_id)::jsonb
            ||
            json_build_object('positionPreferredLanguages', JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('name', t.name, 'level',pts.level))::jsonb)::jsonb
            ||
            json_build_object('preferredLanguages', ARRAY_AGG(DISTINCT(t.name)))::jsonb
            ||
            json_build_object('location', l.formatted_address)::jsonb
          FROM user_question_responses uqr
          JOIN question_responses qr ON qr.id = uqr.response_id
          JOIN questions q ON q.id = uqr.question_id
          JOIN position_tech_stack pts on pts.position_id = m.position_id
          JOIN technologies t on t.id = pts.technology_id
          JOIN locations l on l.position_id = m.position_id
          AND uqr.position_id = m.position_id
          WHERE q.category = 'company_position'
          GROUP BY l.formatted_address
        ) AS position,
        JSONB_AGG(
          DISTINCT
          JSONB_BUILD_OBJECT(
            'body', m.body,
            'createdDate', m.created_date,
            'firstName', u.first_name,
            'id', m.id,
            'lastName', u.last_name,
            'profilePic', u.profile_pic,
            'readDate', m.read_date,
            'userId', u.id,
            'username', u.username
          )::jsonb
        ) AS message_array,
        JSONB_BUILD_OBJECT(
          'companyUrl', c.company_url,
          'description', c.description,
          'location', company_location.formatted_address,
          'logo', c.logo,
          'name', c.company_name,
          'size', c.size
        ) AS company,
        JSONB_BUILD_OBJECT (
          'firstName', candidate_user.first_name,
          'lastName', candidate_user.last_name,
          'username', candidate_user.username,
          'name', candidate_user.first_name || ' ' || candidate_user.last_name,
          'profilePic', candidate_user.profile_pic,
          'userId', candidate_user.id,
          'preferredLanguages', JSON_AGG(DISTINCT JSONB_BUILD_OBJECT('name', t.name, 'level',pts.level))::jsonb,
          'location', candidate_location.formatted_address
        )
        ||
        json_object_agg(q.question_key,  COALESCE(uqr.value, qr.value))::jsonb
        ||
        json_build_object('type', ARRAY_AGG(DISTINCT qr.value) FILTER (WHERE q.question_key = 'type'))::jsonb
        AS candidate,
        ARRAY_AGG(DISTINCT ARRAY[m.to_user_id, m.from_user_id]) AS to_user
      FROM messages m
      JOIN users u ON m.from_user_id = u.id
      JOIN users candidate_user ON candidate_user.id IN (m.from_user_id, m.to_user_id)
      LEFT JOIN position_tech_stack pts ON pts.user_id = candidate_user.id
      LEFT JOIN technologies t ON t.id = pts.technology_id
      JOIN user_question_responses uqr ON uqr.user_id = candidate_user.id
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON uqr.question_id = q.id
      JOIN company_positions cp ON cp.id = m.position_id
      JOIN companies c ON c.id = cp.company_id
      JOIN locations company_location ON company_location.company_id = c.id
      JOIN locations candidate_location ON candidate_location.user_id = candidate_user.id
      WHERE thread_id IN (SELECT thread_id FROM threads)
      GROUP BY
        c.company_name,
        c.company_url,
        c.description,
        c.logo,
        c.size,
        candidate_location.formatted_address,
        candidate_user.first_name,
        candidate_user.id,
        candidate_user.last_name,
        candidate_user.profile_pic,
        candidate_user.username,
        company_location.formatted_address,
        m.position_id,
        m.thread_id
      ORDER BY last_message_date DESC
    )
    SELECT
      (SELECT JSONB_AGG(elem ORDER BY elem ->> 'createdDate' ASC) FROM jsonb_array_elements(m.message_array) elem) AS messages,
      (SELECT id FROM unnest(m.to_user) id WHERE id !=$1 LIMIT 1) AS "toUserId",
      m.candidate,
      m.company,
      m.last_message_date,
      m.position,
      m.thread_id AS "threadId"
    FROM messages m
    WHERE position IS NOT NULL
    AND m.message_array IS NOT NULL
    AND m.company IS NOT NULL
    AND m.candidate IS NOT NULL
  `;

  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = getMessages;
