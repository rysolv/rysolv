const { groupValues, issueCardValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// SEARCH issues
const searchIssues = async ({ value }) => {
  const queryText = `
    SELECT
      ${issueCardValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS language,
      CASE WHEN pullrequests.merged = true THEN true ELSE false END AS "isPullRequestMerged",
      COALESCE(funding.user_accepted, false) AS "isUserAccepted"
    FROM issues
      LEFT JOIN attempting ON attempting.issue_id = issues.id
      LEFT JOIN comments ON comments.target = issues.id
      LEFT JOIN funding ON funding.issue_id = issues.id
      LEFT JOIN languages ON languages.issue_id = issues.id
      LEFT JOIN pullrequests on pullrequests.issue_id = issues.id AND pullrequests.is_deleted = false
      LEFT JOIN repos ON issues.repo_id = repos.id
      LEFT JOIN watching ON watching.issue_id = issues.id
    WHERE
      issues.is_deleted = false AND
      (
        LOWER(issues.body) LIKE LOWER('%'||$1||'%') OR
        LOWER(issues.name) LIKE LOWER('%'||$1||'%') OR
        LOWER(repos.name) LIKE LOWER('%'||$1||'%')
      )
    GROUP BY ${groupValues}, funding.id, funding.is_approved, pullrequests.merged
  `;

  const { rows } = await singleQuery({ queryText, values: [value] });
  return rows;
};

module.exports = searchIssues;
