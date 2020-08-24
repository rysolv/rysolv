const { pullRequestDetailValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

const getUserPullRequests = async id => {
  const queryText = `SELECT ${pullRequestDetailValues} FROM pullRequests
    LEFT JOIN issues ON (pullRequests.issue_id = issues.id)
    WHERE (pullRequests.user_id='${id}')`;

  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getUserPullRequests;
