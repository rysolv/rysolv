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
        activityInput.issueId || null,
        activityInput.organizationId || null,
        activityInput.pullRequestId || null,
        activityInput.userId || null,
        activityInput.value || null,
      ],
    ];

    console.log('activity input', activity);

    const [result] = await createActivity(activity);

    console.log('activity', result);

    return {
      commentId: result.activity_id,
      createdDate: result.created_date,
      actionType: result.action_type,
      issueId: result.issue_id,
      organizationId: result.organization_id,
      pullRequestId: result.pullrequest_id,
      userId: result.user_id,
      value: result.value,
    };
  },
  getAllActivity: async () => {
    try {
      const result = await getActivity('activity');
      return result;
    } catch (err) {
      throw err;
    }
  },
  getActivity: async args => {
    const { column, id } = args;
    try {
      const result = await getActivity('activity', column, id);
      return result;
    } catch (err) {
      throw err;
    }
  },
};
