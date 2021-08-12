const { singleQuery } = require('../../baseQueries');

// GET array of all issue URLs
const getIssueList = async () => {
  const queryText = `
    SELECT array_agg(repo) AS issues FROM issues
  `;
  const { rows } = await singleQuery({ queryText });
  const { issues } = rows[0];
  return issues;
};

module.exports = getIssueList;
