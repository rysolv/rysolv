const { pullRequestDetailValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

const getUserPullRequests = async ({ pullRequestId }) => {
  const queryText = `
    SELECT ${pullRequestDetailValues} FROM pullRequests
    LEFT JOIN issues ON pullRequests.issue_id = issues.id
    WHERE pullRequests.user_id = $1
  `;

  const { rows } = await singleQuery({ queryText, values: [pullRequestId] });
  return rows;
};

module.exports = getUserPullRequests;
