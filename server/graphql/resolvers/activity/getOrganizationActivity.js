const {
  getOrganizationActivity: getOrganizationActivityQuery,
} = require('../../../db');

const getOrganizationActivity = async args => {
  const { organizationId } = args;
  try {
    const result = await getOrganizationActivityQuery({ organizationId });
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
};

module.exports = getOrganizationActivity;
