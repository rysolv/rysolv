const { issueCardValues } = require('./constants');
const { singleSearch } = require('../../baseQueries');

// SEARCH issues
const searchIssues = async value => {
  const fields = ['issues.body', 'issues.name', 'organizations.name'];
  const queryText = `SELECT ${issueCardValues} FROM issues JOIN organizations ON (issues.organization_id = organizations.id)`;
  const rows = await singleSearch(queryText, fields, value);
  return rows;
};

module.exports = searchIssues;
