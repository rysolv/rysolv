const userValues = [
  'attempting',
  'balance',
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
  'last_name',
  'modified_date',
  'personal_link',
  'profile_pic',
  'provider',
  'receive_weekly_emails',
  'rep',
  'stackoverflow_link',
  'upvotes',
  'username',
];

const userReturnValues = `
  (SELECT COALESCE(ARRAY_AGG(DISTINCT(id)), '{}') FROM issues WHERE contributor_id = users.id AND is_deleted = false) AS "issues",
  users.balance,
  users.created_date AS "createdDate",
  users.dollars_earned AS "dollarsEarned",
  users.email_verified AS "emailVerified",
  users.email,
  users.first_name AS "firstName",
  users.github_link AS "githubLink",
  users.id,
  users.is_deleted AS "isDeleted",
  users.last_name AS "lastName",
  users.modified_date AS "modifiedDate",
  users.personal_link AS "personalLink",
  users.profile_pic AS "profilePic",
  users.rep,
  users.stackoverflow_link AS "stackoverflowLink",
  users.upvotes,
  users.username
`;

const userSettingsReturnValues = `
  ARRAY_REMOVE(ARRAY_AGG(DISTINCT(languages.language)), NULL) AS "preferredLanguages",
  CASE WHEN users.github_id IS NOT NULL THEN true ELSE false END AS "isGithubVerified",
  EXISTS(
    SELECT user_question_responses.id FROM user_question_responses
    LEFT JOIN questions ON questions.id = user_question_responses.question_id
    WHERE user_question_responses.user_id = users.id
    AND questions.category = 'hiring') AS "isQuestionnaireComplete",
  users.github_id AS "githubId",
  users.github_username AS "githubUsername",
  users.receive_weekly_emails AS "receiveWeeklyEmails",
  (SELECT COALESCE(ARRAY_AGG(DISTINCT(pullrequest_id)), '{}') FROM pullrequests WHERE is_deleted = false AND user_id = $1) AS "pullRequests",
  (SELECT COALESCE(ARRAY_AGG(DISTINCT(id)), '{}') FROM repos WHERE is_deleted = false AND owner_id = $1) AS "repos",
  ${userReturnValues}
`;

// @TODO: refactor SQL query to not require group values
const groupValues = `
  users.attempting,
  users.balance,
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
  users.last_name,
  users.modified_date,
  users.personal_link,
  users.profile_pic,
  users.provider,
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
