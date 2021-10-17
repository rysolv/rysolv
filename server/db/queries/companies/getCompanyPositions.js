const { singleQuery } = require('../../baseQueries');

const getCompanyPositions = async ({ companyId }) => {
  const queryText = `
    WITH positions AS (
      SELECT
        q.question_key,
        qr.response_key,
        uqr.position_id,
        uqr.value
      FROM user_question_responses uqr 
      JOIN company_positions cp ON cp.id = uqr.position_id
      JOIN question_responses qr ON qr.id = uqr.response_id
      JOIN questions q ON q.id = uqr.question_id
      WHERE cp.company_id = $1
      )
    SELECT json_build_object(
      'location', (SELECT positions.value FROM positions WHERE question_key = 'location'),
      'isRemote', (SELECT positions.response_key FROM positions WHERE question_key = 'is_remote'),
      'positionId', (SELECT positions.position_id FROM positions limit 1),
      'title', (SELECT positions.value FROM positions WHERE question_key = 'title')
    ) AS position;
  `;
  const { rows } = await singleQuery({ queryText, values: [companyId] });
  return rows;
};

module.exports = getCompanyPositions;
