const { activityReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET activity for a specific id
const getUserActivity = async ({ userId }) => {
  const queryText = `SELECT ${activityReturnValues} FROM activity
    LEFT JOIN issues on (activity.issue_id = issues.id)
    LEFT JOIN organizations on (activity.organization_id = organizations.id)
    LEFT JOIN users on (activity.user_id = users.id)
    WHERE activity.user_id = $1
    AND activity.is_private = false
    ORDER BY activity.created_date DESC`;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  return rows;
};

module.exports = getUserActivity;
