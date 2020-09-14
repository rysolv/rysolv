const { groupValues, issueDetailValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET single issue
const getOneIssue = async ({ issueId }) => {
  const queryText = `
    SELECT ${issueDetailValues} FROM issues
    JOIN organizations ON issues.organization_id = organizations.id
    JOIN users ON issues.contributor_id = users.id
    LEFT JOIN attempting ON attempting.issue_id = issues.id
    LEFT JOIN watching ON watching.issue_id = issues.id
    WHERE issues.id= $1
    GROUP BY ${groupValues}, users.id, users.profile_pic, users.username
  `;
  const { rows } = await singleQuery({ queryText, values: [issueId] });
  const [oneRow] = rows;
  if (oneRow) return oneRow;
  throw new Error(`ID not found in issues`);
};

module.exports = getOneIssue;
