/* eslint-disable camelcase */
const {
  mapValues,
  singleItem,
  singleQuery,
  singleSearch,
} = require('../db/query');
const { formatParamaters } = require('./helpers');

const userValues = [
  'id',
  'active_pull_requests',
  'attempting',
  'balance',
  'comments',
  'completed_pull_requests',
  'created_date',
  'dollars_earned',
  'email_verified',
  'email',
  'first_name',
  'github_link',
  'is_deleted',
  'is_online',
  'issues',
  'last_name',
  'modified_date',
  'organizations',
  'personal_link',
  'preferred_languages',
  'profile_pic',
  'pull_requests',
  'rejected_pull_requests',
  'rep',
  'stackoverflow_link',
  'upvotes',
  'username',
  'watching',
];

const userReturnValues = `
  id,
  active_pull_requests AS "activePullRequests",
  attempting,
  balance,
  comments,
  completed_pull_requests AS "completedPullRequests",
  created_date AS "createdDate",
  dollars_earned AS "dollarsEarned",
  email_verified AS "emailVerified",
  email,
  first_name AS "firstName",
  github_link AS "githubLink",
  is_deleted AS "isDeleted",
  is_online AS "isOnline",
  issues,
  last_name AS "lastName",
  modified_date AS "modifiedDate",
  organizations,
  personal_link AS "personalLink",
  preferred_languages AS "preferredLanguages",
  profile_pic AS "profilePic",
  pull_requests AS "pullRequests",
  rejected_pull_requests AS "rejectedPullRequests",
  rep,
  stackoverflow_link AS "stackoverflowLink",
  upvotes,
  username,
  watching
`;

// Check duplicate user email
const checkDuplicateUserEmail = async email => {
  const queryText = `
    SELECT id, email_verified FROM users WHERE email='${email}'
  `;
  const { rows } = await singleQuery(queryText);
  const [result] = rows;
  const { email_verified } = result || {};
  if (rows.length > 0 && email_verified) {
    throw new Error(`E-mail already exists`);
  }
  if (rows.length > 0 && !email_verified) {
    throw new Error(
      `E-mail has not been verified. <a href="/signin" style="text-decoration: underline">Sign in</a> to verify.`,
    );
  }
};

// Check duplicate username
const checkDuplicateUsername = async username => {
  const queryText = `
    SELECT id FROM users WHERE (username='${username}')
  `;
  const { rows } = await singleQuery(queryText);
  if (rows.length > 0) {
    throw new Error(`Username ${username} already exists`);
  }
};

// Create new User
const createUser = async data => {
  const { parameters, substitution, values } = formatParamaters(
    userValues,
    data,
  );
  const queryText = `INSERT INTO
    users( ${parameters} )
    VALUES(${substitution})
    returning *`;
  const [result] = await mapValues(queryText, values);
  return result;
};

// GET single user
const getOneUser = async userId => {
  const [rows] = await singleItem('users', userId, userReturnValues);
  if (rows && !rows.isDeleted) {
    return rows;
  }
  throw new Error(`User does not exist`);
};

// GET single user in the process of signing up
const getOneUserSignUp = async email => {
  const queryText = `SELECT id, email, username FROM users WHERE is_deleted = false AND email = '${email}'`;
  const { rows } = await singleQuery(queryText);
  const [oneRow] = rows;
  return oneRow;
};

// GET all users
const getUsers = async () => {
  const queryText = `SELECT ${userReturnValues} FROM users WHERE is_deleted = false AND email_verified = true`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

const getWatchList = async (id, type) => {
  const paramsDictionary = {
    issueAttemptList: {
      table: 'users',
      values: 'id, profile_pic AS "profilePic", username',
    },
    issueWatchList: {
      table: 'users',
      values: 'id, profile_pic AS "profilePic", username',
    },
    userAttemptList: {
      table: 'issues',
      values:
        'id, modified_date AS "modifiedDate", name, funded_amount AS "fundedAmount"',
    },
    userWatchList: {
      table: 'issues',
      values:
        'id, modified_date AS "modifiedDate", name, funded_amount AS "fundedAmount"',
    },
  };
  const { values, table } = paramsDictionary[type];
  const queryText = `SELECT ${values} FROM ${table} WHERE (id = '${id}')`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// SEARCH users
const searchUsers = async (table, value) => {
  const fields = ['first_name', 'last_name', 'username'];
  const queryText = `SELECT ${userReturnValues} FROM ${table}`;
  const param = 'is_deleted = false';
  const rows = await singleSearch(queryText, fields, value, param);
  return rows;
};

// PATCH single user
const transformUser = async (id, data) => {
  const [rows] = await singleItem('users', id, userValues);
  if (rows) {
    const { parameters, substitution, values } = formatParamaters(
      userValues,
      data,
    );
    const queryText = `UPDATE users
      SET (${parameters})
      = (${substitution})
      WHERE (id = '${id}')
      RETURNING ${userReturnValues}`;
    const [result] = await mapValues(queryText, values);
    return result;
  }
  throw new Error(`Failed to update users. ID not found in users`);
};

const updateUserArray = async ({ column, data, remove, userId }) => {
  const [userData] = await singleItem('users', userId);
  // Only add unique values to array
  if (!userData[column].includes(data) || remove) {
    const action = remove ? 'array_remove' : 'array_append';
    const queryText = `UPDATE users
      SET ${column} = ${action}(${column}, '${data}')
      WHERE (id = '${userId}')
      RETURNING *`;
    const { rows } = await singleQuery(queryText);
    return rows;
  }
  return false;
};

module.exports = {
  checkDuplicateUserEmail,
  checkDuplicateUsername,
  createUser,
  getOneUser,
  getOneUserSignUp,
  getUsers,
  getWatchList,
  searchUsers,
  singleSearch,
  transformUser,
  updateUserArray,
};
