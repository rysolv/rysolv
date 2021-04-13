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
  'repo_url',
  'verified',
];

const repoReturnValues = `
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
  repos.repo_url AS "repoUrl",
  repos.verified
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
  repos.repo_url,
  repos.verified
`;

module.exports = { groupValues, repoReturnValues, repoValues };
