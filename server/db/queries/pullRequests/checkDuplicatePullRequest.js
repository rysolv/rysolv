const { singleQuery } = require('../../baseQueries');

// Check duplicate organization
const checkDuplicatePullRequest = async repo => {
  const queryText = `
    SELECT pullrequest_id FROM pullrequests WHERE (html_url='${repo}')
  `;
  const { rows } = await singleQuery({ queryText });
  return rows.length > 0;
};

module.exports = checkDuplicatePullRequest;
