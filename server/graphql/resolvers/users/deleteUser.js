const { CustomError, errorLogger } = require('../../../helpers');
const { deleteCognitoUser } = require('../../../middlewares/awsConfig');
const {
  deletedUserImage,
  deleteUserError,
  deleteUserSuccess,
  remainingBalanceError,
} = require('./constants');
const {
  deleteRepoMembers,
  deleteUserCompanies,
  deleteUserTechStack,
  deleteUserPullRequests,
  getUserSettings,
  removeAttempting,
  removeWatching,
  transformUser,
} = require('../../../db');

const deleteUser = async (_, { authError, email, provider, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const data = {
      attempting: [],
      balance: 0,
      comments: [],
      dollars_earned: 0,
      email_verified: false,
      email: '',
      first_name: 'Deleted',
      github_id: null,
      github_link: '',
      github_username: null,
      is_deleted: true,
      issues: [],
      last_name: 'User',
      modified_date: new Date(), // update modified date
      personal_link: '',
      profile_pic_blur: deletedUserImage,
      profile_pic: deletedUserImage,
      provider: null,
      pull_requests: [],
      rep: 0,
      repos: [],
      stackoverflow_link: '',
      upvotes: [],
      username: '[deleted]',
    };

    const { balance } = await getUserSettings({ userId });

    if (balance > 0) throw new CustomError(remainingBalanceError);

    if (provider === 'cognito') {
      await deleteCognitoUser({ email });
    }

    await deleteRepoMembers({ userId });
    await deleteUserCompanies({ userId });
    await deleteUserTechStack({ userId });
    await deleteUserPullRequests({ userId });
    await removeAttempting({ userId });
    await removeWatching({ userId });
    await transformUser({ data, userId });

    return {
      __typename: 'Success',
      message: deleteUserSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || deleteUserError,
    };
  }
};

module.exports = deleteUser;
