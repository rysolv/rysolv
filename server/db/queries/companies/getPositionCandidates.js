const { singleQuery } = require('../../baseQueries');

const getPositionCandidates = async ({ positionId, step }) => {
  let filter = '';
  if (step === 'applied') filter = 'AND cp.applied_date IS NOT NULL';
  if (step === 'saved') filter = 'AND cp.saved_date IS NOT NULL';

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
    ),
    company AS (
      SELECT
        c.payment_method,
        lc.contract_key
      FROM company_positions cp
      JOIN companies c on c.id = cp.company_id
      JOIN signed_contracts sc ON c.id = sc.company_id
        JOIN legal_contracts lc ON sc.contract_id = lc.id
      WHERE cp.id = $1
      ORDER BY sc.created_date DESC
      LIMIT 1
    )
    SELECT
      (SELECT CASE WHEN cp.saved_date IS NOT NULL THEN true ELSE false END AS "isSaved"),
      cp.match_criteria AS "matchCriteria",
      cp.percent_match AS "percentMatch",
      l.formatted_address AS "location",
      m.thread_id AS "threadId",
      p.position_id,
      p.position_languages AS "positionLanguages",
      u.first_name AS "firstName",
      u.id,
      u.last_name AS "lastName",
      u.profile_pic AS "profilePic",
      u.profile_pic_blur AS "profilePicBlur",
      (SELECT c.payment_method AS "paymentMethod" FROM company c),
      (SELECT c.contract_key AS "contractKey" FROM company c),
      ARRAY_AGG(DISTINCT qr.value) FILTER (WHERE q.question_key = 'type') AS type,
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
      JOIN locations l on l.user_id = u.id
      LEFT JOIN messages m ON m.to_user_id = u.id AND m.position_id = (SELECT position_id FROM position)
    WHERE cp.position_id = (SELECT position_id FROM position)
    ${filter}
    GROUP BY
      cp.match_criteria,
      cp.percent_match,
      cp.saved_date,
      l.formatted_address,
      m.thread_id,
      p.position_id,
      p.position_languages,
      u.first_name,
      u.id,
      u.last_name,
      u.profile_pic,
      u.profile_pic_blur
    ORDER BY cp.percent_match DESC;
  `;

  const { rows } = await singleQuery({ queryText, values: [positionId] });
  return rows;
};

module.exports = getPositionCandidates;
