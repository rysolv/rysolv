const { mapValues } = require('./query');

// Create new pullRequests from seed
const createPullRequest = async data => {
  const queryText = `INSERT INTO
    pullRequests(id, created_date, modified_date, title, body, repo)
    VALUES($1, $2, $3, $4, $5, $6)
    returning *`;
  await mapValues(queryText, data);
};

module.exports = { createPullRequest };
