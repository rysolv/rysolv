const { CustomError, errorLogger } = require('../../../helpers');
const {
  deletedUserImage,
  deleteUserError,
  deleteUserSuccess,
  remainingBalanceError,
} = require('./constants');
const {
  deleteUserPullRequests,
  getUserSettings,
  transformUser,
} = require('../../../db');

const deleteUser = async (_, { authError, userId }) => {
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
      organizations: [],
      personal_link: '',
      preferred_languages: [],
      profile_pic: deletedUserImage,
      pull_requests: [],
      rep: 0,
      stackoverflow_link: '',
      upvotes: [],
      username: '[deleted]',
    };

    const { balance } = await getUserSettings({ userId });

    if (balance > 0) throw new CustomError(remainingBalanceError);

    await deleteUserPullRequests({ userId });
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
