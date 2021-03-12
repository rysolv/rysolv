const { activityReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET repo activity for a specific id
const getRepoActivity = async ({ repoId }) => {
  const queryText = `SELECT ${activityReturnValues} FROM activity
    LEFT JOIN issues on (activity.issue_id = issues.id)
    LEFT JOIN repos on (activity.repo_id = repos.id)
    LEFT JOIN users on (activity.user_id = users.id)
    WHERE activity.repo_id = $1
    AND issues.is_deleted IS NOT true
    ORDER BY activity.created_date DESC`;
  const { rows } = await singleQuery({ queryText, values: [repoId] });
  return rows;
};

module.exports = getRepoActivity;
