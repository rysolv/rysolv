const { pullRequestDetailValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

const getUserPullRequests = async ({ userId }) => {
  const queryText = `
    SELECT ${pullRequestDetailValues} FROM pullRequests
    LEFT JOIN issues ON pullRequests.issue_id = issues.id
    WHERE
      pullRequests.is_deleted = false AND
      pullRequests.user_id = $1
  `;

  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = getUserPullRequests;
