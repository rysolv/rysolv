const checkDuplicateUserEmail = require('./checkDuplicateUserEmail');
const checkDuplicateUsername = require('./checkDuplicateUsername');
const checkUserGithubId = require('./checkUserGithubId');
const createUser = require('./createUser');
const getOneUser = require('./getOneUser');
const getOneUserSignUp = require('./getOneUserSignUp');
const getUserAttemptList = require('./getUserAttemptList');
const getUsers = require('./getUsers');
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
  getUsers,
  getUserWatchList,
  searchUsers,
  transformUser,
  updateUserArray,
};
