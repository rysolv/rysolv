const { mapValues, singleQuery } = require('./query');

// GET all issues
const getIssues = async table => {
  const queryText = `SELECT * FROM ${table};`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET single issue
const getOneIssue = async (table, id) => {
  const queryText = `SELECT * FROM ${table} WHERE (id='${id}')`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// Create new Issue
const createIssue = async data => {
  const queryText = `INSERT INTO
    issues(id, created_date, modified_date, name, body, repo)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

// GET single issue
const transformIssue = async (table, id, data) => {
  const queryText = `UPDATE ${table} SET (modified_date, name, body, repo) = ($1, $2, $3, $4) WHERE (id = '${id}') RETURNING *`;
  const result = await mapValues(queryText, data);
  return result;
};

// DELETE single issue
const deleteIssue = async (table, id) => {
  const queryText = `DELETE FROM ${table} WHERE (id='${id}') RETURNING *`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = {
  createIssue,
  deleteIssue,
  getIssues,
  getOneIssue,
  transformIssue,
};
