const pool = require('./connect');
const { mapValues, singleQuery } = require('./query');

// Get all issues
const getIssues = async table => {
  const queryText = `SELECT * FROM ${table};`;
  await singleQuery(pool, queryText);
};

// Create new Issue
const createIssue = async data => {
  const queryText = `INSERT INTO
    issues(id, createdDate, modifiedDate, name, body, repo)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
  await mapValues(pool, queryText, data);
};

module.exports = {
  createIssue,
  getIssues,
};
