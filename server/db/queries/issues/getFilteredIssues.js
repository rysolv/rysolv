const { singleQuery } = require('../../baseQueries');

// Get filtered list of issues
const getFilteredIssues = async ({ number, order }) => {
  const orderDict = {
    new: 'ORDER BY i.created_date DESC',
    old: 'ORDER BY i.created_date ASC',
    mostFunded: 'ORDER BY i.funded_amount DESC',
  };

  const baseQuery = `
    SELECT
      i.created_date AS "createdDate",
      i.funded_amount AS "fundedAmount",
      i.github_comment_count AS comments,
      i.id,
      i.name,
      i.repo AS "githubLink",
      COALESCE(ARRAY_AGG(DISTINCT(l.language)), '{}') AS languages,
      r.id AS "repoId",
      r.name AS "repoName"
    FROM issues i
      JOIN languages l ON l.issue_id = i.id
      JOIN repos r ON r.id = i.repo_id
      LEFT JOIN pullrequests pr ON pr.issue_id = i.id
    WHERE i.is_deleted = false
      AND i.open = true
      AND pr.pullrequest_id IS NULL
    GROUP BY
      i.created_date,
      i.funded_amount,
      i.github_comment_count,
      i.id,
      i.name,
      i.repo,
      r.id,
      r.name
  `;

  // Append options/limit to query
  const options = orderDict[order] || '';
  const limit = number ? `LIMIT ${number}` : '';
  const queryText = baseQuery + options + limit;

  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getFilteredIssues;
