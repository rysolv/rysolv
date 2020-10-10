const {
  deletedUserImage,
  deleteUserError,
  deleteUserSuccess,
} = require('./constants');
const { deleteUserPullRequests, transformUser } = require('../../../db');

const deleteUser = async ({ userId }) => {
  try {
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
