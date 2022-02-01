const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const getUserDashboard = require('./getUserDashboard');
const getUserIssues = require('./getUserIssues');
const getUserProfile = require('./getUserProfile');
const getUserRepos = require('./getUserRepos');
const getUserResponse = require('./getUserResponse');
const getUsers = require('./getUsers');
const getUserSettings = require('./getUserSettings');
const githubSignIn = require('./githubSignIn');
const oneUser = require('./oneUser');
const oneUserSignUp = require('./oneUserSignUp');
const resendCode = require('./resendCode');
const resetPassword = require('./resetPassword');
const searchUsers = require('./searchUsers');
const sendLink = require('./sendLink');
const setHiringStatus = require('./setHiringStatus');
const signIn = require('./signIn');
const signOut = require('./signOut');
const transformUser = require('./transformUser');
const transformUserResponse = require('./transformUserResponse');
const transformUserSkills = require('./transformUserSkills');
const updateUserProfile = require('./updateUserProfile');
const verifyUserAccount = require('./verifyUserAccount');
const verifyUserEmail = require('./verifyUserEmail');

module.exports = {
  createUser,
  deleteUser,
  getUserDashboard,
  getUserIssues,
  getUserProfile,
  getUserRepos,
  getUserResponse,
  getUsers,
  getUserSettings,
  githubSignIn,
  oneUser,
  oneUserSignUp,
  resendCode,
  resetPassword,
  searchUsers,
  sendLink,
  setHiringStatus,
  signIn,
  signOut,
  transformUser,
  transformUserResponse,
  transformUserSkills,
  updateUserProfile,
  verifyUserAccount,
  verifyUserEmail,
};
