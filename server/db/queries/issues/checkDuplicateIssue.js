const { singleQuery } = require('../../baseQueries');

// Check duplicate issue
const checkDuplicateIssue = async ({ repo }) => {
  const queryText = `SELECT id FROM issues WHERE repo = $1`;
  const { rows } = await singleQuery({ queryText, values: [repo] });
  return rows.length > 0;
};

module.exports = checkDuplicateIssue;
