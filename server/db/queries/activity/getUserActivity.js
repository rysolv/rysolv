const { activityReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET User Activity for a specific id
const getUserActivity = async ({ userId }) => {
  const queryText = `
    SELECT
      ${activityReturnValues},
      pullrequests.title AS "pullRequestName",
      pullrequests.html_url AS "pullRequestUrl"
    FROM activity
    LEFT JOIN issues on (activity.issue_id = issues.id)
    LEFT JOIN organizations on (activity.organization_id = organizations.id)
    LEFT JOIN pullrequests on (activity.pullrequest_id = pullrequests.pullrequest_id)
    LEFT JOIN users on (activity.user_id = users.id)
    WHERE activity.user_id = $1
    AND activity.is_private = false
    AND issues.is_deleted IS NOT true
    AND organizations.is_deleted IS NOT true
    ORDER BY activity.created_date DESC`;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = getUserActivity;
