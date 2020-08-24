const { singleQuery } = require('../../baseQueries');

// Check duplicate issue
const checkDuplicateIssue = async repo => {
  const queryText = `
    SELECT id FROM issues WHERE (repo='${repo}')
  `;
  const { rows } = await singleQuery({ queryText });
  if (rows.length > 0) {
    return true;
  }
  return false;
};

module.exports = checkDuplicateIssue;
