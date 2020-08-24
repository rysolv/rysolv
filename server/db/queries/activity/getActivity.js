const { activityReturnValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

// GET activity for a specific id
const getActivity = async (table, column, id) => {
  const selection = column
    ? `WHERE ${column} = '${id}' AND activity.is_private = false`
    : 'WHERE activity.is_private = false';

  const queryText = `SELECT ${activityReturnValues} FROM ${table}
    LEFT JOIN issues on (activity.issue_id = issues.id)
    LEFT JOIN organizations on (activity.organization_id = organizations.id)
    LEFT JOIN users on (activity.user_id = users.id)
    ${selection}
    ORDER BY activity.created_date DESC`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = getActivity;
