const { singleQuery } = require('../../baseQueries');

const toggleAttempting = async ({ issueId, userId }) => {
  let remove = false;
  try {
    // Add issueId and userId to attempting
    const insertIssueQuery = `
      INSERT INTO attempting(issue_id, user_id)
      VALUES($1, $2)
      RETURNING issue_id AS "issueId"
    `;
    await singleQuery({
      queryText: insertIssueQuery,
      values: [issueId, userId],
    });
  } catch (error) {
    // Remove issueId and userId from attempting
    const deleteIssueQuery = `
      DELETE FROM attempting
      WHERE issue_id = $1 AND user_id = $2`;
    await singleQuery({
      queryText: deleteIssueQuery,
      values: [issueId, userId],
    });
    remove = true;
  }

  const issueArrayQuery = `
    SELECT
      issues.funded_amount AS "fundedAmount",
      issues.id,
      issues.name
    FROM attempting
    JOIN issues on attempting.issue_id = issues.id
    WHERE user_id = $1`;
  const { rows: issueArray } = await singleQuery({
    queryText: issueArrayQuery,
    values: [userId],
  });

  const userArrayQuery = `
    SELECT user_id AS "userId"
    FROM attempting
    LEFT JOIN users ON attempting.user_id = users.id
    WHERE issue_id = $1
    AND users.is_deleted = false
  `;
  const { rows: userResult } = await singleQuery({
    queryText: userArrayQuery,
    values: [issueId],
  });
  const userArray = userResult.map(el => el.userId);

  return { issueArray, remove, userArray };
};

module.exports = toggleAttempting;
