const { groupValues, issueDetailValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET single issue
const getOneIssue = async id => {
  const queryText = `
    SELECT ${issueDetailValues} FROM issues
    JOIN organizations ON (issues.organization_id = organizations.id)
    JOIN users ON (issues.contributor_id = users.id)
    LEFT JOIN watching ON watching.issue_id = issues.id
    WHERE (issues.id='${id}')
    GROUP BY ${groupValues}, users.id, users.username, users.profile_pic
  `;
  const { rows } = await singleQuery({ queryText });
  if (rows.length > 0) {
    return rows;
  }
  throw new Error(`ID not found in issues`);
};

module.exports = getOneIssue;
