const { parameterizedQuery } = require('../db/query');
const toggleWatching = async ({ issueId, userId }) => {
  let remove = false;

  try {
    // Add issueId and userId to watching
    const insertIssueQuery = `INSERT INTO watching(issue_id, user_id) VALUES($1, $2) RETURNING issue_id AS "issueId"`;
    await parameterizedQuery({
      queryText: insertIssueQuery,
      values: [issueId, userId],
    });
  } catch (error) {
    // Remove issueId and userId from watching
    const deleteIssueQuery = `DELETE FROM watching WHERE (issue_id = $1 AND user_id = $2)`;
    await parameterizedQuery({
      queryText: deleteIssueQuery,
      values: [issueId, userId],
    });
    remove = true;
  }

  const issueArrayQuery = `
    SELECT
      issues.funded_amount AS "fundedAmount",
      issues.id,
      issues.modified_date AS "modifiedDate",
      issues.name
    FROM watching
    JOIN issues on watching.issue_id = issues.id
    WHERE user_id = $1`;
  const { rows: issueArray } = await parameterizedQuery({
    queryText: issueArrayQuery,
    values: [userId],
  });

  const userArrayQuery = `SELECT user_id AS "userId" FROM watching WHERE issue_id = $1`;
  const { rows: userResult } = await parameterizedQuery({
    queryText: userArrayQuery,
    values: [issueId],
  });
  const userArray = userResult.map(el => el.userId);

  return { issueArray, remove, userArray };
};

module.exports = { toggleWatching };
