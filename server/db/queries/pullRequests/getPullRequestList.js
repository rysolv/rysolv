const { singleQuery } = require('../../baseQueries');

const getPullRequestList = async id => {
  const queryText = `
    SELECT
      pullRequests.html_url AS "htmlUrl",
      pullRequests.title,
      pullRequests.user_id AS "userId",
      pullRequests.pullrequest_id AS "pullRequestId",
      users.rep,
      users.username FROM pullRequests
    LEFT JOIN users ON (pullRequests.user_id = users.id)
    WHERE (pullRequests.pullrequest_id='${id}')`;
  const { rows } = await singleQuery({ queryText });
  return rows;
};

module.exports = getPullRequestList;
