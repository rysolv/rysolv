const { singleQuery } = require('../../baseQueries');

// Check duplicate issue
const checkDuplicateIssue = async repo => {
  const queryText = `
    SELECT id FROM issues WHERE (repo='${repo}')
  `;
  const { rows } = await singleQuery({ queryText });
  return rows.length > 0;
};

module.exports = checkDuplicateIssue;
