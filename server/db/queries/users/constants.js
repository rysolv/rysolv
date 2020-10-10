const userValues = [
  'attempting',
  'balance',
  'comments',
  'created_date',
  'dollars_earned',
  'email_verified',
  'email',
  'first_name',
  'github_id',
  'github_link',
  'github_username',
  'id',
  'is_deleted',
  'issues',
  'last_name',
  'modified_date',
  'organizations',
  'personal_link',
  'preferred_languages',
  'profile_pic',
  'pull_requests',
  'rep',
  'stackoverflow_link',
  'upvotes',
  'username',
];

const userReturnValues = `
  attempting,
  balance,
  comments,
  created_date AS "createdDate",
  dollars_earned AS "dollarsEarned",
  email_verified AS "emailVerified",
  email,
  first_name AS "firstName",
  github_link AS "githubLink",
  id,
  is_deleted AS "isDeleted",
  issues,
  last_name AS "lastName",
  modified_date AS "modifiedDate",
  organizations,
  personal_link AS "personalLink",
  preferred_languages AS "preferredLanguages",
  profile_pic AS "profilePic",
  pull_requests AS "pullRequests",
  rep,
  stackoverflow_link AS "stackoverflowLink",
  upvotes,
  username
`;

const userSettingsReturnValues = `
  CASE WHEN github_id IS NOT NULL THEN true ELSE false END AS "isGithubVerified",
  github_username AS "githubUsername",
  ${userReturnValues}
`;

// @TODO: refactor SQL query to not require group values
const groupValues = userValues.join(',');

module.exports = {
  groupValues,
  userReturnValues,
  userSettingsReturnValues,
  userValues,
};
