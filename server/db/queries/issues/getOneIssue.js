const { groupValues, issueDetailValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET single issue
const getOneIssue = async ({ issueId }) => {
  const queryText = `
    SELECT
      ${issueDetailValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS language,
      CASE WHEN funding.id IS NOT NULL THEN true ELSE false END AS "isInFundingQueue"
    FROM issues
    JOIN organizations ON issues.organization_id = organizations.id
    JOIN users ON issues.contributor_id = users.id
    LEFT JOIN attempting ON attempting.issue_id = issues.id
    LEFT JOIN comments ON comments.target = issues.id
    LEFT JOIN funding ON funding.issue_id = issues.id
    LEFT JOIN languages ON languages.issue_id = issues.id
    LEFT JOIN pullrequests on pullrequests.issue_id = issues.id AND pullrequests.is_deleted = false
    LEFT JOIN watching ON watching.issue_id = issues.id
    WHERE issues.id = $1
    GROUP BY ${groupValues}, funding.id, users.id, users.profile_pic, users.username
  `;
  const { rows } = await singleQuery({ queryText, values: [issueId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneIssue;
