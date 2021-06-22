const { singleQuery } = require('../../baseQueries');

const removeWatching = async ({ userId }) => {
  // Remove all issues being watched by the user
  const deleteWatchingQuery = `
      DELETE FROM watching
      WHERE user_id = $1`;

  await singleQuery({
    queryText: deleteWatchingQuery,
    values: [userId],
  });
};

module.exports = removeWatching;
