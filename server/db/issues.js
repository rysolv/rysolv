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
  contributor_id,
  rep,
  watching,
  funded_amount,
  open,
  type
`; // Excludes ID & created_date

const issueCardValues = `
  issues.id,
  issues.created_date AS "createdDate",
  issues.modified_date AS "modifiedDate",
  issues.organization_id AS "organizationId",
  issues.name,
  issues.body,
  issues.repo,
  issues.language,
  issues.comments,
  issues.attempting,
  issues.contributor_id AS "contributorId",
  issues.rep,
  issues.watching,
  issues.funded_amount AS "fundedAmount",
  issues.open,
  issues.type,
  organizations.name AS "organizationName",
  organizations.verified AS "organizationVerified"
`;

const issueDetailValues = `
  ${issueCardValues},
  users.id AS "userId",
  users.username,
  users.profile_pic AS "profilePic"
`;

// Check duplicate issue
const checkDuplicateIssue = async (table, repo) => {
  const queryText = `
    SELECT id FROM ${table} WHERE (repo='${repo}')
  `;
  const { rows } = await singleQuery(queryText);
  if (rows.length > 0) {
    return true;
  }
  return false;
};

// Create new Issue
const createIssue = async data => {
  const queryText = `INSERT INTO
    issues(id, created_date, ${issueValues})
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
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
  const queryText = `SELECT ${issueCardValues} FROM ${table} JOIN organizations ON (issues.organization_id = organizations.id)`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET single issue
const getOneIssue = async (table, id) => {
  const queryText = `
    SELECT ${issueDetailValues} FROM ${table}
    JOIN organizations ON (issues.organization_id = organizations.id)
    JOIN users ON (issues.contributor_id = users.id)
    WHERE (issues.id='${id}')
  `;
  const { rows } = await singleQuery(queryText);
  if (rows.length > 0) {
    return rows;
  }
  throw new Error(`ID not found in ${table}`);
};

// SEARCH issues
const searchIssues = async (table, value) => {
  const fields = ['issues.body', 'issues.name', 'organizations.name'];
  const queryText = `SELECT ${issueCardValues} FROM ${table} JOIN organizations ON (issues.organization_id = organizations.id)`;
  const rows = await singleSearch(queryText, fields, value);
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

const upvoteIssue = async (table, id) => {
  const upvoteQuery = `
    UPDATE ${table} SET rep = rep + 1
    WHERE (id = '${id}')
    RETURNING *`;
  const { rows } = await singleQuery(upvoteQuery);

  return rows;
};

module.exports = {
  checkDuplicateIssue,
  createIssue,
  deleteIssue,
  getIssues,
  getOneIssue,
  searchIssues,
  transformIssue,
  updateIssueArray,
  upvoteIssue,
};
