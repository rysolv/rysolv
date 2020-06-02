/* eslint-disable camelcase */
const {
  mapValues,
  singleItem,
  singleQuery,
  singleSearch,
} = require('../db/query');
const { diff } = require('./helpers');

const userValues = `
  modified_date,
  first_name,
  last_name,
  email,
  watching,
  rep,
  profile_pic,
  comments,
  attempting,
  issues,
  organizations,
  username,
  github_link,
  personal_link,
  preferred_languages,
  stackoverflow_link,
  is_deleted,
  pull_requests,
  upvotes,
  active_pull_requests,
  completed_pull_requests,
  dollars_earned,
  is_online,
  rejected_pull_requests,
  balance
`;

const userReturnValues = `
  id,
  created_date AS "createdDate",
  modified_date AS "modifiedDate",
  first_name AS "firstName",
  last_name AS "lastName",
  email,
  watching,
  rep,
  profile_pic AS "profilePic",
  comments,
  attempting,
  issues,
  organizations,
  username,
  github_link AS "githubLink",
  personal_link AS "personalLink",
  preferred_languages AS "preferredLanguages",
  stackoverflow_link AS "stackoverflowLink",
  pull_requests AS "pullRequests",
  upvotes,
  active_pull_requests AS "activePullRequests",
  completed_pull_requests AS "completedPullRequests",
  dollars_earned AS "dollarsEarned",
  is_online AS "isOnline",
  rejected_pull_requests AS "rejectedPullRequests",
  balance
`;

// Check duplicate user
const checkDuplicateUser = async (table, repo) => {
  const queryText = `
    SELECT id FROM ${table} WHERE (email='${repo}')
  `;
  const { rows } = await singleQuery(queryText);
  if (rows.length > 0) {
    throw new Error(`Error: User at ${repo} already exists`);
  }
};

// Create new User
const createUser = async data => {
  const queryText = `INSERT INTO
    users( id, created_date, ${userValues} )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

// DELETE single user
const deleteUser = async (table, id, data) => {
  const [rows] = await singleItem(table, id);
  if (rows) {
    const { newObjectArray } = diff(rows, data);
    const queryText = `UPDATE ${table}
      SET ( id, created_date, ${userValues} )
      = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
      WHERE (id = '${id}')
      RETURNING *`;
    await mapValues(queryText, [newObjectArray]);
    const { first_name, last_name } = rows;
    return `${first_name} ${last_name} was successfully deleted from ${table}.`;
  }
  throw new Error(`Failed to delete user. ID not found in ${table}`);
};

// GET single user
const getOneUser = async (table, query, column) => {
  const rows = await singleItem(table, query, userReturnValues, column);
  if (rows) {
    return rows;
  }
  throw new Error(`ID not found in ${table}`);
};

// GET all users
const getUsers = async table => {
  const queryText = `SELECT ${userReturnValues} FROM ${table} WHERE is_deleted = false;`;
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
const transformUser = async (table, id, data) => {
  const [rows] = await singleItem(table, id, userValues);
  if (rows) {
    const { newObjectArray } = diff(rows, data);
    const queryText = `UPDATE ${table}
      SET (${userValues})
      = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
      WHERE (id = '${id}')
      RETURNING *`;
    const [result] = await mapValues(queryText, [newObjectArray]);
    return result;
  }
  throw new Error(`Failed to update users. ID not found in ${table}`);
};

const updateUserArray = async (table, column, id, data, remove) => {
  const [userData] = await getOneUser('users', id, 'id');
  // Only add uniquew values to array
  if (!userData[column].includes(data) || remove) {
    const action = remove ? 'array_remove' : 'array_append';
    const queryText = `UPDATE ${table}
      SET ${column} = ${action}(${column}, '${data}')
      WHERE (id = '${id}')
      RETURNING *`;
    const { rows } = await singleQuery(queryText);
    return rows;
  }
  return false;
};

const userUpvote = async (table, id) => {
  const upvoteQuery = `
    UPDATE ${table} SET rep = rep - 1
    WHERE (id = '${id}')
    RETURNING *`;
  const { rows } = await singleQuery(upvoteQuery);
  return rows;
};

module.exports = {
  checkDuplicateUser,
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  getWatchList,
  searchUsers,
  singleSearch,
  transformUser,
  updateUserArray,
  userUpvote,
};
