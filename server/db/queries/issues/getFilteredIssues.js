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
      i.created_date as "createdDate",
      i.funded_amount as "fundedAmount",
      i.github_comment_count AS comments,
      i.id,
      i.name,
      i.repo as "githubLink",
      l.language,
      r.id as "repoId",
      r.name AS "repoName"
    FROM issues i
      JOIN languages l ON l.issue_id = i.id
      JOIN repos r on r.id = i.repo_id
      LEFT JOIN pullrequests pr ON pr.issue_id = i.id
    WHERE i.is_deleted = false
      AND i.open = true
      AND pr.pullrequest_id IS NULL
  `;

  // Append options/limit to query
  const options = orderDict[order] || '';
  const limit = number ? `LIMIT ${number}` : '';
  const queryText = baseQuery + options + limit;

  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getFilteredIssues;
