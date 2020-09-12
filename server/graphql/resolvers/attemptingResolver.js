const { createActivity } = require('./activityResolver');
const { toggleAttempting } = require('../../db');

module.exports = {
  toggleAttempting: async args => {
    const { issueId, userId } = args;
    try {
      const { issueArray, remove, userArray } = await toggleAttempting({
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
  },
};
