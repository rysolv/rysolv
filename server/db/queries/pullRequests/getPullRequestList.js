const { singleQuery } = require('../../baseQueries');

const getPullRequestList = async ({ pullRequestId }) => {
  const queryText = `
    SELECT
      pullRequests.html_url AS "htmlUrl",
      pullRequests.title,
      pullRequests.user_id AS "userId",
      pullRequests.pullrequest_id AS "pullRequestId",
      users.rep,
      users.username FROM pullRequests
    LEFT JOIN users ON pullRequests.user_id = users.id
    WHERE pullRequests.pullrequest_id = $1`;
  const { rows } = await singleQuery({ queryText, values: [pullRequestId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getPullRequestList;
