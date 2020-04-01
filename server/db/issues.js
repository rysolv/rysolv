const { mapValues, singleItem, singleQuery, singleSearch } = require('./query');

const issueReturnValues = `
  id,
  created_date AS "createdDate",
  modified_date AS "modifiedDate",
  organization_id AS "organizationId",
  name,
  body,
  repo,
  language,
  comments,
  attempts,
  active_attempts AS "activeAttempts",
  contributor,
  rep,
  watch_list AS "watchList",
  value
`;

// Create new Issue
const createIssue = async data => {
  const queryText = `INSERT INTO
    issues(
      id,
      created_date,
      modified_date,
      organization_id,
      name,
      body,
      repo,
      language,
      comments,
      attempts,
      active_attempts,
      contributor,
      rep,
      watch_list,
      value
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

// DELETE single issue
const deleteIssue = async (table, id) => {
  const values = '*';
  const rows = await singleItem(table, id, values);
  if (rows.length > 0) {
    const queryText = `DELETE FROM ${table} WHERE (id='${id}') RETURNING *`;
    await singleQuery(queryText);
    return `ID ${id} successfully deleted from table ${table}`;
  }
  throw new Error(`Failed to delete issue. ID not found in ${table}`);
};

// GET all issues
const getIssues = async table => {
  const queryText = `SELECT
    id,
    created_date AS "createdDate",
    modified_date AS "modifiedDate",
    organization_id AS "organizationId",
    name,
    body,
    repo,
    language,
    comments,
    attempts,
    active_attempts AS "activeAttempts",
    contributor,
    rep,
    watch_list AS "watchList",
    value
  FROM ${table};`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET single issue
const getOneIssue = async (table, id) => {
  const values = `
    id,
    created_date AS "createdDate",
    modified_date AS "modifiedDate",
    organization_id AS "organizationId",
    name,
    body,
    repo,
    language,
    comments,
    attempts,
    active_attempts AS "activeAttempts",
    contributor,
    rep,
    watch_list AS "watchList",
    value`;
  const rows = await singleItem(table, id, values);
  if (rows.length > 0) {
    return rows;
  }
  throw new Error(`ID not found in ${table}`);
};

// SEARCH issues
const searchIssues = async (table, value) => {
  console.log('table', table, value);
  const fields = ['body', 'name'];
  const rows = await singleSearch(fields, table, value, issueReturnValues);
  return rows;
};

// TRANSFORM single issue
const transformIssue = async (table, id, data) => {
  const rows = await singleItem(table, id);
  if (rows.length > 0) {
    const queryText = `UPDATE ${table}
      SET (
        modified_date,
        organization_id,
        name,
        body,
        repo,
        language,
        comments,
        attempts,
        active_attempts,
        contributor,
        rep,
        watch_list,
        value
      )
      = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      WHERE (id = '${id}')
      RETURNING *`;
    const result = await mapValues(queryText, data);
    return result;
  }
  throw new Error(`Failed to update. ID not found in ${table}`);
};

module.exports = {
  createIssue,
  deleteIssue,
  getIssues,
  getOneIssue,
  searchIssues,
  transformIssue,
};
