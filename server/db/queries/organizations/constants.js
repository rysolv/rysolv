const organizationValues = [
  'contributors',
  'created_date',
  'description',
  'id',
  'is_manual',
  'issues',
  'logo',
  'modified_date',
  'name',
  'organization_url',
  'owner_id',
  'preferred_languages',
  'repo_url',
  'total_funded',
  'verified',
];

const organizationReturnValues = `
  contributors,
  created_date AS "createdDate",
  description,
  id,
  is_manual AS "isManual",
  issues,
  logo,
  modified_date AS "modifiedDate",
  name,
  organization_url AS "organizationUrl",
  owner_id AS "ownerId",
  preferred_languages AS "preferredLanguages",
  repo_url AS "repoUrl",
  total_funded AS "totalFunded",
  verified
`;

module.exports = { organizationReturnValues, organizationValues };
