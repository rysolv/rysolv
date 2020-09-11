const { singleQuery } = require('../../baseQueries');

const deletePullRequests = async ({ userId }) => {
  const queryText = `
      DELETE FROM pullrequests
      WHERE user_id = $1
    `;
  await singleQuery({ queryText, values: [userId] });
};

module.exports = deletePullRequests;
