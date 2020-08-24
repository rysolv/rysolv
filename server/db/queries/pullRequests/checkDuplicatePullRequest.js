const { singleQuery } = require('../../baseQueries');

// Check duplicate organization
const checkDuplicatePullRequest = async repo => {
  const queryText = `
    SELECT pullrequest_id FROM pullrequests WHERE (html_url='${repo}')
  `;
  const { rows } = await singleQuery(queryText);
  if (rows.length > 0) {
    return true;
  }
  return false;
};

module.exports = checkDuplicatePullRequest;
