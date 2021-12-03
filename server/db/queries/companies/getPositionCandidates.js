const { singleQuery } = require('../../baseQueries');

const getPositionCandidates = async ({ positionId }) => {
  const queryText = `
    SELECT DISTINCT ON (u.id)
      u.id,
      u.first_name AS "firstName",
      u.last_name AS "lastName",
      u.profile_pic AS "profilePic",
      m.thread_id AS "threadId",
      JSON_OBJECT_AGG(
          q.question_key,  coalesce(uqr.value, qr.value)
      ) AS "userQuestions"
    FROM candidate_positions cp
      JOIN users u ON u.id = cp.user_id
      JOIN user_question_responses uqr ON uqr.user_id = u.id
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      LEFT JOIN messages m ON m.to_user_id = u.id AND m.position_id = $1
    WHERE cp.position_id = $1
    GROUP BY
      m.thread_id,
      u.id,
      u.first_name,
      u.last_name,
      u.profile_pic
  `;

  const { rows } = await singleQuery({ queryText, values: [positionId] });
  return rows;
};

module.exports = getPositionCandidates;
