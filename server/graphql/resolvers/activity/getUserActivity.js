const { getUserActivity: getUserActivityQuery } = require('../../../db');

const getUserActivity = async ({ userId }) => {
  try {
    const activityArray = await getUserActivityQuery({ userId });
    return activityArray;
  } catch (error) {
    return [];
  }
};

module.exports = getUserActivity;
