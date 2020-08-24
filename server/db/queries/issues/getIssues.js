const { issueCardValues, groupValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET all issues
const getIssues = async () => {
  const queryText = `SELECT ${issueCardValues} FROM issues
    LEFT JOIN organizations ON (issues.organization_id = organizations.id)
    LEFT JOIN watching ON watching.issue_id = issues.id
    GROUP BY ${groupValues}`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = getIssues;
