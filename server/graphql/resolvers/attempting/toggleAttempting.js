const { createActivity } = require('../activity');
const { errorLogger } = require('../../../helpers');
const { toggleAttempting: toggleAttemptingQuery } = require('../../../db');
const { toggleAttemptingError } = require('./constants');

const toggleAttempting = async ({ issueId }, { authError, userId }) => {
  try {
    if (authError || !userId) {
      const error = new Error();
      error.alert = authError;
      throw error;
    }

    const { issueArray, remove, userArray } = await toggleAttemptingQuery({
      issueId,
      userId,
    });

    const activityInput = {
      actionType: remove ? 'remove_attempting' : 'add_attempting',
      issueId,
      userId,
    };
    await createActivity({ activityInput });

    const result = { issueArray, userArray };

    return {
      __typename: 'AttemptingArray',
      ...result,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || toggleAttemptingError,
    };
  }
};

module.exports = toggleAttempting;
