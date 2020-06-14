const { v4: uuidv4 } = require('uuid');
const { createActivity, getActivity } = require('../../db');

module.exports = {
  createActivity: async args => {
    const { activityInput } = args;
    const activity = [
      [
        uuidv4(),
        new Date(),
        activityInput.actionType || null,
        activityInput.fundedValue || null,
        activityInput.issueId || null,
        activityInput.organizationId || null,
        activityInput.pullRequestId || null,
        activityInput.userId || null,
      ],
    ];

    const [result] = await createActivity(activity);

    return {
      commentId: result.activity_id,
      createdDate: result.created_date,
      actionType: result.action_type,
      issueId: result.issue_id,
      organizationId: result.organization_id,
      pullRequestId: result.pullrequest_id,
      userId: result.user_id,
      fundedValue: result.funded_value,
    };
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
