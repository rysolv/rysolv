const { getUserWatchList, toggleWatching } = require('../../db');
const { createActivity } = require('./activityResolver');

module.exports = {
  getUserWatchList: async () => {
    try {
      const result = await getUserWatchList();
      return {
        __typename: 'ActivityArray',
        activityArray: result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  toggleWatching: async args => {
    const { issueId, userId } = args;
    try {
      const { issueArray, remove, userArray } = await toggleWatching({
        issueId,
        userId,
      });

      const activityInput = {
        actionType: remove ? 'remove_watching' : 'add_watching',
        issueId,
        userId,
      };
      await createActivity({ activityInput });

      const result = { issueArray, userArray };

      return {
        __typename: 'WatchListArray',
        ...result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
};
