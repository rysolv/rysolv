const { mapValues, singleItem, singleQuery, singleSearch } = require('./query');

// GET all organizations
const getOrganizations = async table => {
  const queryText = `SELECT
    id,
    created_date AS "createdDate",
    modified_date AS "modifiedDate",
    name,
    description,
    repo_url AS "repoUrl",
    website,
    issues,
    logo,
    verified
  FROM ${table};`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET single issue
const getOneOrganization = async (table, id) => {
  const values = ` id,
    created_date AS "createdDate",
    modified_date AS "modifiedDate",
    name,
    description,
    repo_url AS "repoUrl",
    website,
    issues,
    logo,
    verified`;
  const rows = await singleItem(table, id, values);
  if (rows.length > 0) {
    return rows;
  }
  throw new Error(`ID not found in ${table}`);
};

// Create new Issue
const createOrganization = async data => {
  const queryText = `INSERT INTO
    organizations(
      id,
      created_date,
      modified_date,
      name,
      description,
      repo_url,
      website,
      issues,
      logo,
      verified
    )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    returning *`;
  const result = await mapValues(queryText, data);
  return result;
};

// TRANSFORM single Organization
const transformOrganization = async (table, id, data) => {
  const rows = await singleItem(table, id);
  if (rows.length > 0) {
    const queryText = `UPDATE ${table}
      SET (
        modified_date,
        name,
        description,
        repo_url,
        website,
        issues,
        logo,
        verified
      )
      = ($1, $2, $3, $4, $5, $6, $7, $8)
      WHERE (id = '${id}')
      RETURNING *`;
    const result = await mapValues(queryText, data);
    return result;
  }
  throw new Error(`Failed to update. ID not found in ${table}`);
};

// SEARCH organizations
const searchOrganizations = async (table, value) => {
  const fields = ['name'];
  const rows = await singleSearch(fields, table, value);
  return rows;
};

// DELETE single organization
const deleteOrganization = async (table, id) => {
  const rows = await singleItem(table, id);
  if (rows.length > 0) {
    const queryText = `DELETE FROM ${table} WHERE (id='${id}') RETURNING *`;
    const {
      rows: [resultRow],
    } = await singleQuery(queryText);
    const { name } = resultRow;
    return `${name} was successfully deleted from ${table}.`;
  }
  throw new Error(`Failed to delete organization. ID not found in ${table}`);
};

module.exports = {
  createOrganization,
  deleteOrganization,
  getOneOrganization,
  getOrganizations,
  searchOrganizations,
  transformOrganization,
};
