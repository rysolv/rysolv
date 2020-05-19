const { mapValues, singleItem, singleQuery, singleSearch } = require('./query');
const { diff } = require('./helpers');

const organizationValues = `
  modified_date,
  name,
  description,
  repo_url,
  organization_url,
  issues,
  logo,
  verified,
  contributors,
  owner_id,
  total_funded,
  preferred_languages
`; // Excludes ID & created_date

const organizationReturnValues = `
  id,
  created_date AS "createdDate",
  modified_date AS "modifiedDate",
  name,
  description,
  repo_url AS "repoUrl",
  organization_url AS "organizationUrl",
  issues,
  logo,
  verified,
  contributors,
  owner_id AS "ownerId",
  total_funded AS "totalFunded",
  preferred_languages AS "preferredLanguages"
`;

// Check duplicate organization
const checkDuplicateOrganization = async (table, repo) => {
  const queryText = `
    SELECT id FROM ${table} WHERE (repo_url='${repo}')
  `;
  const { rows } = await singleQuery(queryText);
  if (rows.length > 0) {
    return true;
  }
  return false;
};

// Create new organization
const createOrganization = async data => {
  const queryText = `INSERT INTO
    organizations(id, created_date, ${organizationValues})
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    returning *`;
  console.log('createOrg', data);
  const result = await mapValues(queryText, data);
  return result;
};

// DELETE single organization
const deleteOrganization = async (table, id) => {
  const rows = await singleItem(table, id);
  if (rows) {
    const queryText = `DELETE FROM ${table} WHERE (id='${id}') RETURNING *`;
    const {
      rows: [resultRow],
    } = await singleQuery(queryText);
    const { name } = resultRow;
    return `${name} was successfully deleted from ${table}.`;
  }
  throw new Error(`Failed to delete organization. ID not found in ${table}`);
};

// GET single organization
const getOneOrganization = async (table, id) => {
  const rows = await singleItem(table, id, organizationReturnValues);
  if (rows) {
    return rows;
  }
  throw new Error(`ID not found in ${table}`);
};

// GET all organizations
const getOrganizations = async table => {
  const queryText = `SELECT ${organizationReturnValues} FROM ${table};`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET all organizations
const getOrganizationsWhere = async (table, column, value) => {
  const queryText = `SELECT ${organizationReturnValues} FROM ${table} WHERE (${column}='${value}');`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// SEARCH organizations
const searchOrganizations = async (table, value) => {
  const fields = ['name'];

  const queryText = `SELECT ${organizationReturnValues} FROM ${table}`;
  const rows = await singleSearch(queryText, fields, value);
  return rows;
};

// TRANSFORM single Organization
const transformOrganization = async (table, id, data) => {
  const [rows] = await singleItem(table, id, organizationValues);
  if (rows) {
    const { newObjectArray } = diff(rows, data);
    const queryText = `UPDATE ${table}
      SET (${organizationValues})
      = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      WHERE (id = '${id}')
      RETURNING *`;
    const [result] = await mapValues(queryText, [newObjectArray]);
    return result;
  }
  throw new Error(`Failed to update. ID not found in ${table}`);
};

// ADD TO ARRAY
const updateOrganizationArray = async (table, column, id, data, remove) => {
  const action = remove ? 'array_remove' : 'array_append';
  const queryText = `UPDATE ${table}
    SET ${column} = ${action}(${column}, '${data}')
    WHERE (id = '${id}')
    RETURNING *`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

module.exports = {
  checkDuplicateOrganization,
  createOrganization,
  deleteOrganization,
  getOneOrganization,
  getOrganizations,
  getOrganizationsWhere,
  searchOrganizations,
  transformOrganization,
  updateOrganizationArray,
};
