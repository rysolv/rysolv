const { singleQuery } = require('../../baseQueries');

// Check duplicate organization
const checkDuplicatePullRequest = async ({ repo }) => {
  const queryText = `
    SELECT pullrequest_id
    FROM pullrequests
    WHERE
      html_url = $1 AND
      is_deleted = false
  `;
  const { rows } = await singleQuery({ queryText, values: [repo] });
  return rows.length > 0;
};

module.exports = checkDuplicatePullRequest;
