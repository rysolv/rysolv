const { mapValues, singleItem, singleQuery, singleSearch } = require('./query');
const { formatParamaters } = require('./helpers');

const organizationValues = [
  'contributors',
  'created_date',
  'description',
  'id',
  'issues',
  'logo',
  'modified_date',
  'name',
  'organization_url',
  'owner_id',
  'preferred_languages',
  'repo_url',
  'total_funded',
  'verified',
];

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
const checkDuplicateOrganization = async repo => {
  const queryText = `
    SELECT id FROM organizations WHERE (repo_url='${repo}')
  `;
  const { rows } = await singleQuery(queryText);
  if (rows.length > 0) {
    return true;
  }
  return false;
};

// Create new organization
const createOrganization = async data => {
  const { parameters, substitution, values } = formatParamaters(
    organizationValues,
    data,
  );
  const queryText = `INSERT INTO
    organizations(${parameters})
    VALUES(${substitution})
    returning ${organizationReturnValues}`;
  const result = await mapValues(queryText, values);
  return result;
};

// DELETE single organization
const deleteOrganization = async id => {
  const rows = await singleItem('organizations', id);
  if (rows) {
    const queryText = `DELETE FROM organizations WHERE (id='${id}') RETURNING *`;
    const {
      rows: [resultRow],
    } = await singleQuery(queryText);
    const { name } = resultRow;
    return `${name} was successfully deleted from organizations.`;
  }
  throw new Error(
    `Failed to delete organization. ID not found in organizations`,
  );
};

// GET single organization
const getOneOrganization = async id => {
  const rows = await singleItem('organizations', id, organizationReturnValues);
  if (rows) {
    return rows;
  }
  throw new Error(`ID not found in organizations`);
};

// GET all organizations
const getOrganizations = async () => {
  const queryText = `SELECT ${organizationReturnValues} FROM organizations`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// GET all organizations
const getOrganizationsWhere = async (column, value) => {
  const queryText = `SELECT ${organizationReturnValues} FROM organizations WHERE (${column}='${value}')`;
  const { rows } = await singleQuery(queryText);
  return rows;
};

// SEARCH organizations
const searchOrganizations = async value => {
  const fields = ['name'];

  const queryText = `SELECT ${organizationReturnValues} FROM organizations`;
  const rows = await singleSearch(queryText, fields, value);
  return rows;
};

// TRANSFORM single Organization
const transformOrganization = async (id, data) => {
  const [rows] = await singleItem('organizations', id, organizationValues);
  if (rows) {
    const { parameters, substitution, values } = formatParamaters(
      organizationValues,
      data,
    );

    const queryText = `UPDATE organizations
      SET (${parameters})
      = (${substitution})
      WHERE (id = '${id}')
      RETURNING ${organizationReturnValues}`;
    const [result] = await mapValues(queryText, values);
    return result;
  }
  throw new Error(`Failed to update. ID not found in organizations`);
};

// ADD TO ARRAY
const updateOrganizationArray = async (column, id, data, remove) => {
  const action = remove ? 'array_remove' : 'array_append';
  const queryText = `UPDATE organizations
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
