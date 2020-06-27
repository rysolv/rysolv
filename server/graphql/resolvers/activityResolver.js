const { v4: uuidv4 } = require('uuid');
const { createActivity, getActivity } = require('../../db');

module.exports = {
  createActivity: async args => {
    const { activityInput } = args;
    const activity = {
      activity_id: uuidv4(),
      created_date: new Date(),
      action_type: activityInput.actionType || null,
      funded_value: activityInput.fundedValue || null,
      issue_id: activityInput.issueId || null,
      organization_id: activityInput.organizationId || null,
      pullrequest_id: activityInput.pullRequestId || null,
      user_id: activityInput.userId || null,
    };

    const message = await createActivity(activity);
    return message;
  },
  getAllActivity: async () => {
    try {
      const result = await getActivity('activity');
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
  getActivity: async args => {
    const { column, id } = args;
    try {
      const result = await getActivity('activity', column, id);
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
};
