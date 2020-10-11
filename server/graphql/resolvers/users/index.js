const checkDuplicateUser = require('./checkDuplicateUser');
const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const getUsers = require('./getUsers');
const getUserSettings = require('./getUserSettings');
const oneUser = require('./getUserSettings');
const oneUserSignUp = require('./oneUserSignUp');
const searchUsers = require('./searchUsers');
const transformUser = require('./transformUser');
const verifyUserAccount = require('./verifyUserAccount');
const verifyUserEmail = require('./verifyUserEmail');

module.exports = {
  checkDuplicateUser,
  createUser,
  deleteUser,
  getUsers,
  getUserSettings,
  oneUser,
  oneUserSignUp,
  searchUsers,
  transformUser,
  verifyUserAccount,
  verifyUserEmail,
};
