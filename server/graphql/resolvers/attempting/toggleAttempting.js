const { createActivity } = require('../activity');
const { toggleAttempting: toggleAttemptingQuery } = require('../../../db');
const { toggleAttemptingError } = require('./constants');

const toggleAttempting = async ({ issueId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new Error(authError);

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
    return {
      __typename: 'Error',
      message: toggleAttemptingError,
    };
  }
};

module.exports = toggleAttempting;
