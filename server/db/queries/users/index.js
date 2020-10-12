const checkDuplicateUserEmail = require('./checkDuplicateUserEmail');
const checkDuplicateUsername = require('./checkDuplicateUsername');
const checkUserGithubId = require('./checkUserGithubId');
const createUser = require('./createUser');
const getOneUser = require('./getOneUser');
const getOneUserSignUp = require('./getOneUserSignUp');
const getUserAttemptList = require('./getUserAttemptList');
const getUserPullRequestDetail = require('./getUserPullRequestDetail');
const getUsers = require('./getUsers');
const getUserSettings = require('./getUserSettings');
const getUserWatchList = require('./getUserWatchList');
const searchUsers = require('./searchUsers');
const transformUser = require('./transformUser');
const updateUserArray = require('./updateUserArray');

module.exports = {
  checkDuplicateUserEmail,
  checkDuplicateUsername,
  checkUserGithubId,
  createUser,
  getOneUser,
  getOneUserSignUp,
  getUserAttemptList,
  getUserPullRequestDetail,
  getUsers,
  getUserSettings,
  getUserWatchList,
  searchUsers,
  transformUser,
  updateUserArray,
};
