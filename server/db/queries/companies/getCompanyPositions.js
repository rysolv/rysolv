const { singleQuery } = require('../../baseQueries');

const getCompanyPositions = async ({ companyId }) => {
  const queryText = `
    SELECT cp.id AS "positionId", json_object_agg(
      q.question_key,  coalesce(uqr.value, qr.value)
    ) AS "positionData"
      FROM user_question_responses uqr 
      JOIN company_positions cp ON cp.id = uqr.position_id
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
    WHERE cp.company_id = $1
    GROUP BY cp.id
  `;
  const { rows } = await singleQuery({ queryText, values: [companyId] });
  return rows;
};

module.exports = getCompanyPositions;
