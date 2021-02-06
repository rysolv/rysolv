const organizationValues = [
  'created_date',
  'description',
  'id',
  'is_deleted',
  'is_manual',
  'issues',
  'logo',
  'modified_date',
  'name',
  'organization_url',
  'owner_id',
  'repo_url',
  'total_funded',
  'verified',
];

const organizationReturnValues = `
  organizations.created_date AS "createdDate",
  organizations.description,
  organizations.id,
  organizations.is_manual AS "isManual",
  organizations.issues,
  organizations.logo,
  organizations.modified_date AS "modifiedDate",
  organizations.name,
  organizations.organization_url AS "organizationUrl",
  organizations.owner_id AS "ownerId",
  organizations.repo_url AS "repoUrl",
  organizations.total_funded AS "totalFunded",
  organizations.verified
`;

const groupValues = `
  organizations.created_date,
  organizations.description,
  organizations.id,
  organizations.is_deleted,
  organizations.is_manual,
  organizations.issues,
  organizations.logo,
  organizations.modified_date,
  organizations.name,
  organizations.organization_url,
  organizations.owner_id,
  organizations.repo_url,
  organizations.total_funded,
  organizations.verified
`;

module.exports = { groupValues, organizationReturnValues, organizationValues };
