const { singleQuery } = require('../../baseQueries');

const getCompanyPositions = async ({ companyId }) => {
  const queryText = `
    SELECT
      cp.id AS "positionId", 
      l.formatted_address AS location,
      json_object_agg(
        q.question_key,  coalesce(uqr.value, qr.value)
      ) AS "positionData"
    FROM user_question_responses uqr
    JOIN company_positions cp ON cp.id = uqr.position_id
    JOIN locations l on l.position_id = cp.id
    JOIN question_responses qr ON qr.id = uqr.response_id
    JOIN questions q ON q.id = uqr.question_id
    WHERE cp.company_id = $1
    GROUP BY cp.id, l.formatted_address
    ORDER BY cp.created_date DESC
  `;
  const { rows } = await singleQuery({ queryText, values: [companyId] });
  return rows;
};

module.exports = getCompanyPositions;
