const { CustomError, errorLogger } = require('../../../helpers');
const {
  getOneIssue,
  getOneRepo,
  getUserAttemptList,
  getUserBounties,
  getUserPullRequestDetail,
  getUserSettings: getUserSettingsQuery,
  getUserWatchList,
} = require('../../../db');
const { getUserSettingsError } = require('./constants');

const getUserDashboard = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await getUserSettingsQuery({ userId });

    console.log(result);

    return {
      __typename: 'User',
      ...result,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || getUserSettingsError,
    };
  }
};

module.exports = getUserDashboard;
