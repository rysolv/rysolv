const { singleQuery } = require('../../baseQueries');

// Check duplicate repo
const checkDuplicateRepo = async ({ repo }) => {
  const queryText = `
    SELECT id FROM repos WHERE repo_url = $1
  `;
  const { rows } = await singleQuery({ queryText, values: [repo] });
  return rows.length > 0;
};
module.exports = checkDuplicateRepo;
