const assignOwnerToRepo = require('./assignOwnerToRepo');
const checkDuplicateGithubId = require('./checkDuplicateGithubId');
const checkDuplicateUserEmail = require('./checkDuplicateUserEmail');
const checkExistingGithubAccount = require('./checkExistingGithubAccount');
const checkGithubIdMatch = require('./checkGithubIdMatch');
const createUser = require('./createUser');
const getOneUser = require('./getOneUser');
const getOneUserSignUp = require('./getOneUserSignUp');
const getUserAttemptList = require('./getUserAttemptList');
const getUserBounties = require('./getUserBounties');
const getUserByUsername = require('./getUserByUsername');
const getUserCompany = require('./getUserCompany');
const getUserPullRequestDetail = require('./getUserPullRequestDetail');
const getUsers = require('./getUsers');
const getUserSettings = require('./getUserSettings');
const getUserWatchList = require('./getUserWatchList');
const insertGitUser = require('./insertGitUser');
const insertUserEmail = require('./insertUserEmail');
const searchUsers = require('./searchUsers');
const transformUser = require('./transformUser');

module.exports = {
  assignOwnerToRepo,
  checkDuplicateGithubId,
  checkDuplicateUserEmail,
  checkExistingGithubAccount,
  checkGithubIdMatch,
  createUser,
  getOneUser,
  getOneUserSignUp,
  getUserAttemptList,
  getUserBounties,
  getUserByUsername,
  getUserCompany,
  getUserPullRequestDetail,
  getUsers,
  getUserSettings,
  getUserWatchList,
  insertGitUser,
  insertUserEmail,
  searchUsers,
  transformUser,
};
