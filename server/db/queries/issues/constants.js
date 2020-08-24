const issueValues = [
  'attempting',
  'body',
  'comments',
  'contributor_id',
  'created_date',
  'funded_amount',
  'id',
  'is_manual',
  'language',
  'modified_date',
  'name',
  'open',
  'organization_id',
  'rep',
  'repo',
  'type',
];

const issueReturnValues = `
  issues.attempting,
  issues.body,
  issues.comments,
  issues.contributor_id AS "contributorId",
  issues.created_date AS "createdDate",
  issues.funded_amount AS "fundedAmount",
  issues.id,
  issues.is_manual AS "isManual",
  issues.language,
  issues.modified_date AS "modifiedDate",
  issues.name,
  issues.open,
  issues.organization_id AS "organizationId",
  issues.pull_requests AS "pullRequests",
  issues.rep,
  issues.repo,
  issues.type
`;

const issueCardValues = `
  ${issueReturnValues},
  ARRAY_REMOVE(ARRAY_AGG(watching.user_id), NULL) AS watching,
  organizations.name AS "organizationName",
  organizations.verified AS "organizationVerified"
`;

const issueDetailValues = `
  ${issueCardValues},
  users.id AS "userId",
  users.username,
  users.profile_pic AS "profilePic"
`;

// TODO: refactor SQL query to not require group values
const groupValues = `
  issues.attempting,
  issues.body,
  issues.comments,
  issues.contributor_id,
  issues.created_date,
  issues.funded_amount,
  issues.id,
  issues.language,
  issues.modified_date,
  issues.name,
  issues.open,
  issues.organization_id,
  issues.pull_requests,
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
