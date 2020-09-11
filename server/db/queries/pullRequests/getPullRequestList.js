const { singleQuery } = require('../../baseQueries');

const getPullRequestList = async ({ issueId }) => {
  const queryText = `
    SELECT
      pullRequests.html_url AS "htmlUrl",
      pullRequests.title,
      pullRequests.user_id AS "userId",
      pullRequests.pullrequest_id AS "pullRequestId",
      users.rep,
      users.username FROM pullRequests
    LEFT JOIN users ON pullRequests.user_id = users.id
    WHERE pullRequests.issue_id = $1`;
  const { rows } = await singleQuery({ queryText, values: [issueId] });
  return rows;
};

module.exports = getPullRequestList;
