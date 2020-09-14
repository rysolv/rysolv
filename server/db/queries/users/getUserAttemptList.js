const { singleQuery } = require('../../baseQueries');

const getUserAttemptList = async ({ userId }) => {
  const queryText = `
    SELECT
      issues.id,
      issues.name,
      issues.funded_amount AS "fundedAmount"
    FROM attempting
    JOIN issues ON attempting.issue_id = issues.id
    WHERE attempting.user_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = getUserAttemptList;
