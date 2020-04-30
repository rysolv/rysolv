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
  issues_number,
  username,
  github_link,
  personal_link,
  preferred_languages,
  stackoverflow_link,
  pull_requests
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
  issues_number AS "issuesNumber",
  username,
  github_link AS "githubLink",
  personal_link AS "personalLink",
  preferred_languages AS "preferredLanguages",
  stackoverflow_link AS "stackoverflowLink",
  pull_requests AS "pullRequests"
`;

// Create new User
const createUser = async data => {
  const queryText = `INSERT INTO
    users( id, created_date, ${userValues} )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

// DELETE single user
const deleteUser = async (table, id) => {
  const rows = await singleItem(table, id);
  if (rows) {
    const queryText = `DELETE FROM ${table} WHERE (id='${id}') RETURNING *`;
    const {
      rows: [resultRow],
    } = await singleQuery(queryText);
    const { first_name, last_name } = resultRow;
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
  const queryText = `SELECT ${userReturnValues} FROM ${table};`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// SEARCH users
const searchUsers = async (table, value) => {
  const fields = ['first_name', 'last_name', 'username'];
  const queryText = `SELECT ${userReturnValues} FROM ${table}`;
  const rows = await singleSearch(queryText, fields, value);
  return rows;
};

// PATCH single user
const transformUser = async (table, id, data) => {
  const [rows] = await singleItem(table, id, userValues);
  if (rows) {
    const { newObjectArray } = diff(rows, data);
    const queryText = `UPDATE ${table}
      SET (${userValues})
      = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      WHERE (id = '${id}')
      RETURNING *`;
    const [result] = await mapValues(queryText, [newObjectArray]);
    return result;
  }
  throw new Error(`Failed to update users. ID not found in ${table}`);
};

const updateUserArray = async (table, column, id, data, remove) => {
  const action = remove ? 'array_remove' : 'array_append';
  const queryText = `UPDATE ${table}
    SET ${column} = ${action}(${column}, '${data}')
    WHERE (id = '${id}')
    RETURNING *`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  searchUsers,
  singleSearch,
  transformUser,
  updateUserArray,
};
