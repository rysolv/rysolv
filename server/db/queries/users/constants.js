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
  'profile_pic',
  'provider',
  'pull_requests',
  'rep',
  'stackoverflow_link',
  'upvotes',
  'username',
];

const userReturnValues = `
  users.balance,
  users.comments,
  users.created_date AS "createdDate",
  users.dollars_earned AS "dollarsEarned",
  users.email_verified AS "emailVerified",
  users.email,
  users.first_name AS "firstName",
  users.github_link AS "githubLink",
  users.id,
  users.is_deleted AS "isDeleted",
  users.issues,
  users.last_name AS "lastName",
  users.modified_date AS "modifiedDate",
  users.organizations,
  users.personal_link AS "personalLink",
  users.profile_pic AS "profilePic",
  users.pull_requests AS "pullRequests",
  users.rep,
  users.stackoverflow_link AS "stackoverflowLink",
  users.upvotes,
  users.username
`;

const userSettingsReturnValues = `
  ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages",
  CASE WHEN users.github_id IS NOT NULL THEN true ELSE false END AS "isGithubVerified",
  users.github_username AS "githubUsername",
  ${userReturnValues}
`;

// @TODO: refactor SQL query to not require group values
const groupValues = `
  users.attempting,
  users.balance,
  users.comments,
  users.created_date,
  users.dollars_earned,
  users.email_verified,
  users.email,
  users.first_name,
  users.github_id,
  users.github_link,
  users.github_username,
  users.id,
  users.is_deleted,
  users.issues,
  users.last_name,
  users.modified_date,
  users.organizations,
  users.personal_link,
  users.profile_pic,
  users.provider,
  users.pull_requests,
  users.rep,
  users.stackoverflow_link,
  users.upvotes,
  users.username
`;

module.exports = {
  groupValues,
  userReturnValues,
  userSettingsReturnValues,
  userValues,
};
