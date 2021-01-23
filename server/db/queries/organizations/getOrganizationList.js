const { singleQuery } = require('../../baseQueries');

// GET array of all organization URLs
const getOrganizationList = async () => {
  const queryText = `
    SELECT array_agg(repo_url) AS organizations FROM organizations
  `;
  const { rows } = await singleQuery({ queryText });
  const { organizations } = rows[0];
  return organizations;
};

module.exports = getOrganizationList;
