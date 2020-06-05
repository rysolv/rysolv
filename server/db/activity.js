const { mapValues, singleQuery } = require('../db/query');

const activityValues = `
  activity_id,
  created_date,
  action_type,
  issue_id,
  organization_id,
  pullrequest_id,
  user_id,
  value
`;

const activityReturnValues = `
  activity_id AS "activityId",
  activity.created_date AS "createdDate",
  activity.action_type AS "actionType",
  activity.issue_id AS "issueId",
  activity.organization_id AS "organizationId",
  activity.pullrequest_id AS "pullRequestId",
  activity.user_id AS "userId",
  activity.value,
  issues.name AS "issueName",
  organizations.name AS "organizationName",
  users.username AS "username"
`;

// Record a new activity
const createActivity = async data => {
  const queryText = `INSERT INTO
    activity(${activityValues})
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

// GET activity for a specific id
const getActivity = async (table, column, id) => {
  const selection = column ? `WHERE ${column} ='${id}'` : '';

  const queryText = `SELECT ${activityReturnValues} FROM ${table}
    LEFT JOIN issues on (activity.issue_id = issues.id)
    LEFT JOIN organizations on (activity.organization_id = organizations.id)
    LEFT JOIN users on (activity.user_id = users.id)
    ${selection}`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = { createActivity, getActivity };
