const { activityReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET Organization Activity for a specific id
const getOrganizationActivity = async ({ organizationId }) => {
  const queryText = `SELECT ${activityReturnValues} FROM activity
    LEFT JOIN issues on (activity.issue_id = issues.id)
    LEFT JOIN organizations on (activity.organization_id = organizations.id)
    LEFT JOIN users on (activity.user_id = users.id)
    WHERE activity.organization_id = $1
    AND issues.is_deleted IS NOT true
    ORDER BY activity.created_date DESC`;
  const { rows } = await singleQuery({ queryText, values: [organizationId] });
  return rows;
};

module.exports = getOrganizationActivity;
