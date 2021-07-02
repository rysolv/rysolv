const { singleQuery } = require('../../baseQueries');

const removeAttempting = async ({ userId }) => {
  // Remove all issues being attempted by the user
  const deleteAttemptingQuery = `
      DELETE FROM attempting
      WHERE user_id = $1`;

  await singleQuery({
    queryText: deleteAttemptingQuery,
    values: [userId],
  });
};

module.exports = removeAttempting;
