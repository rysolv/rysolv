const {
  deletedUserImage,
  deleteUserError,
  deleteUserSuccess,
} = require('./constants');
const { deleteUserPullRequests, transformUser } = require('../../../db');

const deleteUser = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new Error(authError);

    const data = {
      active_pull_requests: 0,
      attempting: [],
      balance: 0,
      comments: [],
      completed_pull_requests: 0,
      dollars_earned: 0,
      email_verified: false,
      email: '',
      first_name: 'Deleted',
      github_id: null,
      github_link: '',
      github_username: null,
      is_deleted: true,
      is_online: false,
      issues: [],
      last_name: 'User',
      modified_date: new Date(), // update modified date
      organizations: [],
      personal_link: '',
      preferred_languages: [],
      profile_pic: deletedUserImage,
      pull_requests: [],
      rejected_pull_requests: 0,
      rep: 0,
      stackoverflow_link: '',
      upvotes: [],
      username: '[deleted]',
    };
    await deleteUserPullRequests({ userId });
    await transformUser({ data, userId });
    return {
      __typename: 'Success',
      message: deleteUserSuccess,
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: deleteUserError,
    };
  }
};

module.exports = deleteUser;
