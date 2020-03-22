const { mapValues } = require('./query');

// Create new Issue
const createOrganization = async data => {
  const queryText = `INSERT INTO
    organizations(id, created_date, modified_date, name, description, repo)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
  await mapValues(queryText, data);
};

module.exports = {
  createOrganization,
};
