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

module.exports = { activityReturnValues, activityValues };
