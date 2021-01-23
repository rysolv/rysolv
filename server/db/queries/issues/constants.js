const issueValues = [
  'body',
  'contributor_id',
  'created_date',
  'funded_amount',
  'github_comment_count',
  'id',
  'is_manual',
  'modified_date',
  'name',
  'open',
  'organization_id',
  'rep',
  'repo',
  'type',
];

const issueReturnValues = `
  issues.body,
  issues.contributor_id AS "contributorId",
  issues.created_date AS "createdDate",
  issues.funded_amount AS "fundedAmount",
  issues.id,
  issues.is_manual AS "isManual",
  issues.modified_date AS "modifiedDate",
  issues.name,
  issues.open,
  issues.organization_id AS "organizationId",
  issues.rep,
  issues.repo,
  issues.type
`;

const issueCardValues = `
  ${issueReturnValues},
  ARRAY_REMOVE(ARRAY_AGG(DISTINCT(attempting.user_id)), NULL) AS attempting,
  ARRAY_REMOVE(ARRAY_AGG(DISTINCT(watching.user_id)), NULL) AS watching,
  COUNT(DISTINCT(comments.id)) + github_comment_count AS comments,
  organizations.name AS "organizationName",
  organizations.verified AS "organizationVerified"
`;

const issueDetailValues = `
  ${issueCardValues},
  COUNT(DISTINCT(pullrequests.pullrequest_id)) AS "pullRequests",
  users.id AS "userId",
  users.username,
  users.profile_pic AS "profilePic"
`;

const groupValues = `
  issues.body,
  issues.contributor_id,
  issues.created_date,
  issues.funded_amount,
  issues.id,
  issues.modified_date,
  issues.name,
  issues.open,
  issues.organization_id,
  issues.rep,
  issues.repo,
  issues.type,
  organizations.name,
  organizations.verified
`;

module.exports = {
  groupValues,
  issueCardValues,
  issueDetailValues,
  issueReturnValues,
  issueValues,
};
