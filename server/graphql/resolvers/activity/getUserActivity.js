const { getUserActivity: getUserActivityQuery } = require('../../../db');

const getUserActivity = async args => {
  const { userId } = args;
  try {
    const result = await getUserActivityQuery({ userId });
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

module.exports = getUserActivity;
