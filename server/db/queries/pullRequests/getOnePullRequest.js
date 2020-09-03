const { pullRequestDetailValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

const getOnePullRequest = async ({ pullRequestId }) => {
  const queryText = `
    SELECT ${pullRequestDetailValues}
    FROM pullRequests
    LEFT JOIN issues ON pullRequests.issue_id = issues.id
    WHERE pullRequests.pullrequest_id = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [pullRequestId] });
  const [oneRow] = rows;
  if (oneRow) return oneRow;
  throw new Error('Pull Request not found');
};
module.exports = getOnePullRequest;
