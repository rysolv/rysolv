const checkDuplicateGithubId = require('./checkDuplicateGithubId');
const checkDuplicateUserEmail = require('./checkDuplicateUserEmail');
const checkExistingGithubAccount = require('./checkExistingGithubAccount');
const checkGithubIdMatch = require('./checkGithubIdMatch');
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

module.exports = {
  checkDuplicateGithubId,
  checkDuplicateUserEmail,
  checkExistingGithubAccount,
  checkGithubIdMatch,
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
};
