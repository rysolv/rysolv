const { singleQuery } = require('../../baseQueries');

// Check duplicate organization
const checkDuplicateOrganization = async ({ repo }) => {
  const queryText = `
    SELECT id FROM organizations WHERE repo_url = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [repo] });
  return rows.length > 0;
};
module.exports = checkDuplicateOrganization;
