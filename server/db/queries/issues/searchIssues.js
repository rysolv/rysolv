const { groupValues, issueCardValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// SEARCH issues
const searchIssues = async ({ value }) => {
  const queryText = `
    SELECT
      ${issueCardValues},
      ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS language
    FROM issues
      LEFT JOIN attempting ON attempting.issue_id = issues.id
      LEFT JOIN comments ON comments.target = issues.id
      LEFT JOIN languages ON languages.issue_id = issues.id
      LEFT JOIN organizations ON issues.organization_id = organizations.id
      LEFT JOIN watching ON watching.issue_id = issues.id
    WHERE
      LOWER(issues.body) LIKE LOWER('%'||$1||'%') OR
      LOWER(issues.name) LIKE LOWER('%'||$1||'%') OR
      LOWER(organizations.name) LIKE LOWER('%'||$1||'%')
    GROUP BY ${groupValues}
  `;

  const { rows } = await singleQuery({ queryText, values: [value] });
  return rows;
};

module.exports = searchIssues;
