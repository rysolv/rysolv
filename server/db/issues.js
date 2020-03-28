const { mapValues, singleQuery, singleItem } = require('./query');

// GET all issues
const getIssues = async table => {
  const queryText = `SELECT * FROM ${table};`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET single issue
const getOneIssue = async (table, id) => {
  const rows = await singleItem(table, id);
  if (rows.length > 0) {
    return rows;
  }
  throw new Error(`ID not found in ${table}`);
};

// Create new Issue
const createIssue = async data => {
  const queryText = `INSERT INTO
    issues(
      id,
      created_date,
      modified_date,
      organization,
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
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

// TRANSFORM single issue
const transformIssue = async (table, id, data) => {
  const rows = await singleItem(table, id);
  if (rows.length > 0) {
    const queryText = `UPDATE ${table}
      SET (
        modified_date,
        organization,
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
      = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      WHERE (id = '${id}')
      RETURNING *`;
    const result = await mapValues(queryText, data);
    return result;
  }
  throw new Error(`Failed to update. ID not found in ${table}`);
};

// DELETE single issue
const deleteIssue = async (table, id) => {
  const rows = await singleItem(table, id);
  if (rows.length > 0) {
    const queryText = `DELETE FROM ${table} WHERE (id='${id}') RETURNING *`;
    await singleQuery(queryText);
    return `ID ${id} successfully deleted from table ${table}`;
  }
  throw new Error(`Failed to delete issue. ID not found in ${table}`);
};

module.exports = {
  createIssue,
  deleteIssue,
  getIssues,
  getOneIssue,
  transformIssue,
};
