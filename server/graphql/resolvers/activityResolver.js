const { v4: uuidv4 } = require('uuid');
const { createActivity, getActivity } = require('../../db');
//   activity_id,
//   created_date,
//   action_type,
//   issue_id,
//   organization_id,
//   pullrequest_id,
//   user_id,
//   value
module.exports = {
  createActivity: async args => {
    const { activityInput } = args;
    const activity = [
      [
        uuidv4(),
        new Date(),
        activityInput.actionType,
        activityInput.issueId,
        activityInput.organizationId,
        activityInput.pullRequestId,
        activityInput.userId,
        activityInput.value,
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
      value: result.value,
    };
  },
  getActivity: async args => {
    const { column, id } = args;
    console.log(args);
    try {
      const result = await getActivity('activity', column, id);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
