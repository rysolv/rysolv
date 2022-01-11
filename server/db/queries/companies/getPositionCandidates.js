const { singleQuery } = require('../../baseQueries');

const getPositionCandidates = async ({ positionId, saved }) => {
  const filter = saved ? 'AND cp.saved = true' : '';

  const queryText = `
    WITH position AS (
      SELECT
        cp.id AS "position_id",
        JSON_AGG(
          DISTINCT JSONB_BUILD_OBJECT('name', t.name, 'level', pts.level)
        )::jsonb AS "position_languages"
      FROM company_positions cp
        JOIN position_tech_stack pts ON pts.position_id = cp.id
        JOIN technologies t ON pts.technology_id = t.id
      WHERE cp.id = $1
      GROUP BY cp.id
    )
    SELECT
      cp.percent_match AS "percentMatch",
      cp.saved as "isSaved",
      m.thread_id AS "threadId",
      p.position_id,
      p.position_languages AS "positionLanguages",
      u.first_name AS "firstName",
      u.id,
      u.last_name AS "lastName",
      u.profile_pic AS "profilePic",
      JSON_AGG(
        DISTINCT JSONB_BUILD_OBJECT('name', t.name, 'level',pts.level)
      )::jsonb AS "userLanguages",
      JSON_OBJECT_AGG(
        q.question_key, coalesce(uqr.value, qr.value)
      )::JSONB AS "userQuestions"
    FROM position p
      JOIN candidate_positions cp ON cp.position_id = p.position_id
      JOIN users u ON u.id = cp.user_id
      JOIN position_tech_stack pts ON pts.user_id = u.id
      JOIN technologies t ON pts.technology_id = t.id
      JOIN user_question_responses uqr on uqr.user_id = u.id
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id AND q.category = 'hiring'
      LEFT JOIN messages m ON m.to_user_id = u.id AND m.position_id = (SELECT position_id FROM position)
    WHERE cp.position_id = (SELECT position_id FROM position)
    ${filter}
    GROUP BY
      cp.percent_match,
      cp.saved,
      m.thread_id,
      p.position_id,
      p.position_languages,
      u.first_name,
      u.id,
      u.last_name,
      u.profile_pic
    ORDER BY cp.percent_match DESC;
  `;

  const { rows } = await singleQuery({ queryText, values: [positionId] });
  return rows;
};

module.exports = getPositionCandidates;
