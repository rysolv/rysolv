const { mapValues, singleItem, singleQuery, singleSearch } = require('./query');
const { diff } = require('./helpers');

const issueValues = `
  modified_date,
  organization_id,
  name,
  body,
  repo,
  language,
  comments,
  attempting,
  contributor,
  rep,
  watching,
  value,
  open
`; // Excludes ID & created_date

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
  attempting,
  contributor,
  rep,
  watching,
  value,
  open
`;

// Create new Issue
const createIssue = async data => {
  const queryText = `INSERT INTO
    issues(id, created_date, ${issueValues})
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

// DELETE single issue
const deleteIssue = async (table, id) => {
  const rows = await singleItem(table, id);
  if (rows) {
    const queryText = `DELETE FROM ${table} WHERE (id='${id}') RETURNING *`;
    await singleQuery(queryText);
    return `ID ${id} successfully deleted from table ${table}`;
  }
  throw new Error(`Failed to delete issue. ID not found in ${table}`);
};

// GET all issues
const getIssues = async table => {
  const queryText = `SELECT ${issueReturnValues} FROM ${table};`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET single issue
const getOneIssue = async (table, id) => {
  const rows = await singleItem(table, id, issueReturnValues);
  if (rows.length > 0) {
    return rows;
  }
  throw new Error(`ID not found in ${table}`);
};

// SEARCH issues
const searchIssues = async (table, value) => {
  const fields = ['body', 'name'];
  const rows = await singleSearch(fields, table, value, issueReturnValues);
  return rows;
};

// TRANSFORM single issue
const transformIssue = async (table, id, data) => {
  const [rows] = await singleItem(table, id, issueValues);
  if (rows) {
    const { newObjectArray } = diff(rows, data);
    const queryText = `UPDATE ${table}
      SET (${issueValues})
      = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      WHERE (id = '${id}')
      RETURNING *`;
    const [result] = await mapValues(queryText, [newObjectArray]);
    return result;
  }
  throw new Error(`Failed to update. ID not found in ${table}`);
};

const updateIssueArray = async (table, column, id, data, remove) => {
  const action = remove ? 'array_remove' : 'array_append';
  const queryText = `UPDATE ${table}
    SET ${column} = ${action}(${column}, '${data}')
    WHERE (id = '${id}')
    RETURNING *`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = {
  createIssue,
  deleteIssue,
  getIssues,
  getOneIssue,
  searchIssues,
  transformIssue,
  updateIssueArray,
};
