const { createActivity } = require('../activity');
const { toggleWatching: toggleWatchingQuery } = require('../../../db');
const { toggleWatchingError } = require('./constants');

const toggleWatching = async ({ issueId, userId }) => {
  try {
    const { issueArray, remove, userArray } = await toggleWatchingQuery({
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
  } catch (error) {
    return {
      __typename: 'Error',
      message: toggleWatchingError,
    };
  }
};

module.exports = toggleWatching;
