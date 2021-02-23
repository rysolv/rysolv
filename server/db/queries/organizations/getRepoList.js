const { singleQuery } = require('../../baseQueries');

// GET array of all repo URLs
const getRepoList = async () => {
  const queryText = `
    SELECT array_agg(repo_url) AS repos FROM repos
  `;
  const { rows } = await singleQuery({ queryText });
  const { repos } = rows[0];
  return repos;
};

module.exports = getRepoList;
