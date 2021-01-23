const pullRequestValues = [
  'created_date',
  'github_username',
  'html_url',
  'is_deleted',
  'issue_id',
  'mergeable_state',
  'mergeable',
  'merged',
  'modified_date',
  'open',
  'pull_number',
  'pullrequest_id',
  'title',
  'user_id',
];

const pullRequestReturnValues = `
  pullRequests.created_date AS "createdDate",
  pullRequests.github_username AS "githubUsername",
  pullRequests.html_url AS "htmlUrl",
  pullRequests.issue_id AS "issueId",
  pullRequests.mergeable AS "mergeable",
  pullRequests.mergeable_state AS "mergeableState",
  pullRequests.merged,
  pullRequests.modified_date AS "modifiedDate",
  pullRequests.open,
  pullRequests.pull_number AS "pullNumber",
  pullRequests.pullrequest_id AS "pullRequestId",
  pullRequests.title,
  pullRequests.user_id AS "userId"
`;

const pullRequestDetailValues = `
  ${pullRequestReturnValues},
  issues.funded_amount AS "fundedAmount",
  issues.name AS "issueName"
`;

module.exports = {
  pullRequestDetailValues,
  pullRequestReturnValues,
  pullRequestValues,
};
