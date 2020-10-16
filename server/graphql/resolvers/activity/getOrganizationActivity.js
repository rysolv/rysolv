const { errorLogger } = require('../../../helpers');
const {
  getOrganizationActivity: getOrganizationActivityQuery,
} = require('../../../db');

const getOrganizationActivity = async ({ organizationId }) => {
  try {
    const activityArray = await getOrganizationActivityQuery({
      organizationId,
    });
    return activityArray;
  } catch (error) {
    errorLogger(error);
    return [];
  }
};

module.exports = getOrganizationActivity;
