const { singleQuery } = require('../../baseQueries');

const getUserWatchList = async ({ userId }) => {
  const queryText = `
    SELECT
      issues.id,
      issues.modified_date AS "modifiedDate",
      issues.name,
      issues.funded_amount AS "fundedAmount"
    FROM watching
    JOIN issues on watching.issue_id = issues.id
    WHERE watching.user_id = '${userId}'`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = getUserWatchList;
