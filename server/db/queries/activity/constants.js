const activityValues = [
  'action_type',
  'activity_id',
  'created_date',
  'funded_value',
  'is_private',
  'issue_id',
  'pullrequest_id',
  'repo_id',
  'user_id',
];

const activityReturnValues = `
  activity_id AS "activityId",
  activity.action_type AS "actionType",
  activity.created_date AS "createdDate",
  activity.funded_value AS "fundedValue",
  activity.issue_id AS "issueId",
  activity.pullrequest_id AS "pullRequestId",
  activity.repo_id AS "repoId",
  activity.user_id AS "userId",
  issues.name AS "issueName",
  repos.name AS "repoName",
  users.profile_pic AS "profilePic",
  users.username AS "username"
`;

module.exports = { activityReturnValues, activityValues };
