const { createActivity } = require('../activity');
const { toggleAttempting: toggleAttemptingQuery } = require('../../../db');

const toggleAttempting = async args => {
  const { issueId, userId } = args;
  try {
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
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = toggleAttempting;
