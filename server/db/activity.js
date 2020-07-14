const { mapValues, singleQuery } = require('../db/query');
const { formatParamaters } = require('./helpers');

const activityValues = [
  'action_type',
  'activity_id',
  'created_date',
  'funded_value',
  'is_private',
  'issue_id',
  'organization_id',
  'pullrequest_id',
  'user_id',
];

const activityReturnValues = `
  activity_id AS "activityId",
  activity.action_type AS "actionType",
  activity.created_date AS "createdDate",
  activity.funded_value AS "fundedValue",
  activity.issue_id AS "issueId",
  activity.organization_id AS "organizationId",
  activity.pullrequest_id AS "pullRequestId",
  activity.user_id AS "userId",
  issues.name AS "issueName",
  organizations.name AS "organizationName",
  users.profile_pic AS "profilePic",
  users.username AS "username"
`;

// Record a new activity
const createActivity = async data => {
  const { parameters, substitution, values } = formatParamaters(
    activityValues,
    data,
  );
  const queryText = `INSERT INTO
    activity(${parameters})
    VALUES(${substitution})`;
  await mapValues(queryText, values);
  return 'Successfully logged activity';
};

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

module.exports = { createActivity, getActivity };
