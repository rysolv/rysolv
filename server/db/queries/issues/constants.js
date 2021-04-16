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
  'rep',
  'repo_id',
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
  issues.rep,
  issues.repo_id AS "repoId",
  issues.repo,
  issues.type
`;

const issueCardValues = `
  ${issueReturnValues},
  ARRAY_REMOVE(ARRAY_AGG(DISTINCT(attempting.user_id)), NULL) AS attempting,
  ARRAY_REMOVE(ARRAY_AGG(DISTINCT(watching.user_id)), NULL) AS watching,
  COUNT(DISTINCT(comments.id)) + github_comment_count AS comments,
  EXISTS(
    SELECT user_repos.id FROM user_repos
    WHERE user_repos.repo_id = repos.id
    AND user_repos.user_type = 'github_owner'
    AND user_repos.user_id IS NOT NULL) AS "repoVerified",
  repos.name AS "repoName"
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
  issues.rep,
  issues.repo_id,
  issues.repo,
  issues.type,
  repos.id,
  repos.name
`;

module.exports = {
  groupValues,
  issueCardValues,
  issueDetailValues,
  issueReturnValues,
  issueValues,
};
