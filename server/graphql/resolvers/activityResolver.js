const { v4: uuidv4 } = require('uuid');
const {
  createActivity,
  getOrganizationActivity,
  getUserActivity,
} = require('../../db');

module.exports = {
  createActivity: async args => {
    const { activityInput } = args;
    const data = {
      action_type: activityInput.actionType || null,
      activity_id: uuidv4(),
      created_date: activityInput.createdDate || new Date(),
      funded_value: activityInput.fundedValue || null,
      is_private: activityInput.isPrivate || false,
      issue_id: activityInput.issueId || null,
      organization_id: activityInput.organizationId || null,
      pullrequest_id: activityInput.pullRequestId || null,
      user_id: activityInput.userId || null,
    };

    const message = await createActivity({ data });
    return message;
  },
  getOrganizationActivity: async args => {
    const { organizationId } = args;
    try {
      const result = await getOrganizationActivity({ organizationId });
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
  getUserActivity: async args => {
    const { userId } = args;
    try {
      const result = await getUserActivity({ userId });
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
