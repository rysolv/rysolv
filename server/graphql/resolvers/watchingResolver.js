const { createActivity } = require('./activity');
const { toggleWatching } = require('../../db');

module.exports = {
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
