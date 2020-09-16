const { deletedUserImage } = require('./constants');
const { transformUser } = require('../../../db');

const deleteUser = async args => {
  const { userId } = args;
  try {
    const data = {
      activePullRequests: 0,
      attempting: [],
      balance: 0,
      comments: [],
      completedPullRequests: 0,
      dollarsEarned: 0,
      email_verified: false,
      email: '',
      first_name: 'Deleted',
      github_link: '',
      is_deleted: true,
      isOnline: false,
      issues: [],
      last_name: 'User',
      modified_date: new Date(), // update modified date
      organizations: [],
      personal_link: '',
      preferred_languages: [],
      profile_pic: deletedUserImage,
      rejectedPullRequests: 0,
      rep: 0,
      stackoverflow_link: '',
      username: '[deleted]',
    };
    await transformUser({ data, userId });
    return 'User successfully deleted';
  } catch (err) {
    throw err;
  }
};

module.exports = deleteUser;
