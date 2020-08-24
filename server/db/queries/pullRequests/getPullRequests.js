const { pullRequestDetailValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

const getPullRequests = async () => {
  const queryText = `SELECT ${pullRequestDetailValues} FROM pullRequests
    LEFT JOIN issues ON (pullRequests.issue_id = issues.id)`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = getPullRequests;
