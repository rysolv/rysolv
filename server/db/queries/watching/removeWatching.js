const { singleQuery } = require('../../baseQueries');

const removeWatching = async ({ userId }) => {
  // Remove issueId and userId from attempting
  const deleteIssueQuery = `
      DELETE FROM watching
      WHERE user_id = $1`;

  await singleQuery({
    queryText: deleteIssueQuery,
    values: [userId],
  });
};

module.exports = removeWatching;
