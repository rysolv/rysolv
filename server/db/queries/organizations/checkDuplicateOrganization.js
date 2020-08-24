const { singleQuery } = require('../../baseQueries');

// Check duplicate organization
const checkDuplicateOrganization = async repo => {
  const queryText = `
    SELECT id FROM organizations WHERE (repo_url='${repo}')
  `;
  const { rows } = await singleQuery({ queryText });
  if (rows.length > 0) {
    return true;
  }
  return false;
};

module.exports = checkDuplicateOrganization;
