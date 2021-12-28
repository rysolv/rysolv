const repoValues = [
  'created_date',
  'description',
  'id',
  'is_manual',
  'logo',
  'modified_date',
  'name',
  'organization_url',
  'owner_id',
  'payout_url',
  'repo_url',
];

const repoReturnValues = `
  EXISTS(
    SELECT user_repos.id FROM user_repos
    WHERE user_repos.repo_id = repos.id
    AND user_repos.user_type = 'github_owner'
    AND user_repos.user_id IS NOT NULL) AS "verified",
  (SELECT COALESCE(ARRAY_AGG(DISTINCT(issues.id)), '{}') FROM issues WHERE repos.id = issues.repo_id AND repos.is_deleted = false) AS "issues",
  repos.created_date AS "createdDate",
  repos.description,
  repos.id,
  repos.is_manual AS "isManual",
  repos.logo,
  repos.modified_date AS "modifiedDate",
  repos.name,
  repos.organization_url AS "organizationUrl",
  repos.owner_id AS "ownerId",
  repos.payout_url AS "payoutUrl",
  repos.repo_url AS "repoUrl"
`;

const groupValues = `
  repos.created_date,
  repos.description,
  repos.id,
  repos.is_deleted,
  repos.is_manual,
  repos.logo,
  repos.modified_date,
  repos.name,
  repos.organization_url,
  repos.owner_id,
  repos.payout_url,
  repos.repo_url
`;

const reposGroupValues = `
  ${groupValues},
  l."preferredLanguages"
`;

module.exports = {
  groupValues,
  repoReturnValues,
  reposGroupValues,
  repoValues,
};
