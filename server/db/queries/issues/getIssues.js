const { issueCardValues, groupValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all issues
const getIssues = async () => {
  const queryText = `
    SELECT
      DISTINCT ON (issues.id)
      ${issueCardValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS language,
      CASE WHEN pullrequests.merged = true THEN true ELSE false END AS "isPullRequestMerged",
      COALESCE(funding.user_accepted, false) AS "isUserAccepted"
    FROM issues
    LEFT JOIN users ON users.is_deleted = false
    LEFT JOIN attempting ON attempting.issue_id = issues.id AND attempting.user_id = users.id
    LEFT JOIN comments ON comments.target = issues.id
    LEFT JOIN funding ON funding.issue_id = issues.id
    LEFT JOIN languages ON languages.issue_id = issues.id
    LEFT JOIN pullrequests on pullrequests.issue_id = issues.id AND pullrequests.is_deleted = false
    LEFT JOIN repos ON issues.repo_id = repos.id
    LEFT JOIN watching ON watching.issue_id = issues.id AND watching.user_id = users.id
    WHERE issues.is_deleted = false
    GROUP BY ${groupValues}, funding.id, funding.is_approved, pullrequests.merged
  `;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getIssues;
