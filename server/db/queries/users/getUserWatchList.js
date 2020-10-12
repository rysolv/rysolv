const { singleQuery } = require('../../baseQueries');

const getUserWatchList = async ({ userId }) => {
  const queryText = `
    SELECT
      issues.id,
      issues.modified_date AS "modifiedDate",
      issues.name,
      issues.funded_amount AS "fundedAmount"
    FROM watching
    JOIN issues ON watching.issue_id = issues.id
    WHERE watching.user_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = getUserWatchList;
