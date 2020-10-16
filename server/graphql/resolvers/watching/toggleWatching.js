const { createActivity } = require('../activity');
const { errorLogger } = require('../../../helpers');
const { toggleWatching: toggleWatchingQuery } = require('../../../db');
const { toggleWatchingError } = require('./constants');

const toggleWatching = async ({ issueId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new Error(authError);

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
    const { message } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: message || toggleWatchingError,
    };
  }
};

module.exports = toggleWatching;
