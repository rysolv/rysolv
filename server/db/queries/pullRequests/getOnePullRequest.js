const { pullRequestDetailValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

const getOnePullRequest = async id => {
  const queryText = `SELECT ${pullRequestDetailValues} FROM pullRequests
    LEFT JOIN issues ON (pullRequests.issue_id = issues.id)
    WHERE (pullRequests.pullrequest_id='${id}')`;
  const { rows } = await singleQuery(queryText);
  if (rows.length > 0) {
    return rows;
  }
  throw new Error('ID not found in Pull Requests');
};
module.exports = getOnePullRequest;
