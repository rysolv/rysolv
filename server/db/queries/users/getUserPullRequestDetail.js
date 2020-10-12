const { singleQuery } = require('../../baseQueries');

const getUserPullRequestDetail = async ({ userId }) => {
  const activeQueryText = `
    SELECT
      COUNT(pullrequests.pullrequest_id) AS "activePullRequests"
    FROM pullrequests
    WHERE
      merged = false AND
      open = true AND
      pullrequests.user_id = $1
  `;
  const { rows: activeRows } = await singleQuery({
    queryText: activeQueryText,
    values: [userId],
  });
  const [{ activePullRequests }] = activeRows;

  const completedQueryText = `
    SELECT
      COUNT(pullrequests.pullrequest_id) AS "completedPullRequests"
    FROM pullrequests
    WHERE
      merged = true AND
      open = false AND
      pullrequests.user_id = $1
  `;
  const { rows: completedRows } = await singleQuery({
    queryText: completedQueryText,
    values: [userId],
  });
  const [{ completedPullRequests }] = completedRows;

  const rejectedQueryText = `
    SELECT
      COUNT(pullrequests.pullrequest_id) AS "rejectedPullRequests"
    FROM pullrequests
    WHERE
      merged = false AND
      open = false AND
      pullrequests.user_id = $1
  `;
  const { rows: rejectedRows } = await singleQuery({
    queryText: rejectedQueryText,
    values: [userId],
  });
  const [{ rejectedPullRequests }] = rejectedRows;

  return { activePullRequests, completedPullRequests, rejectedPullRequests };
};

module.exports = getUserPullRequestDetail;
