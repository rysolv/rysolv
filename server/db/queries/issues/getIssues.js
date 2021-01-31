const { issueCardValues, groupValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all issues
const getIssues = async () => {
  const queryText = `
    SELECT
      ${issueCardValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS language,
      CASE WHEN funding.id IS NOT NULL AND funding.is_approved = false THEN true ELSE false END AS "isInFundingQueue",
      CASE WHEN pullrequests.merged = true THEN true ELSE false END AS "isPullRequestMerged"
    FROM issues
    LEFT JOIN attempting ON attempting.issue_id = issues.id
    LEFT JOIN comments ON comments.target = issues.id
    LEFT JOIN funding ON funding.issue_id = issues.id
    LEFT JOIN languages ON languages.issue_id = issues.id
    LEFT JOIN organizations ON issues.organization_id = organizations.id
    LEFT JOIN pullrequests on pullrequests.issue_id = issues.id AND pullrequests.is_deleted = false
    LEFT JOIN watching ON watching.issue_id = issues.id
    GROUP BY ${groupValues}, funding.id, funding.is_approved, pullrequests.merged
  `;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getIssues;
