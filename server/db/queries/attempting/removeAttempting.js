const { singleQuery } = require('../../baseQueries');

const removeAttempting = async ({ userId }) => {
  // Remove issueId and userId from attempting
  const deleteIssueQuery = `
      DELETE FROM attempting
      WHERE user_id = $1`;

  await singleQuery({
    queryText: deleteIssueQuery,
    values: [userId],
  });
};

module.exports = removeAttempting;
