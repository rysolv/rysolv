// const pool = require('./connect');
const {
  createIssue,
  deleteIssue,
  getIssues,
  getOneIssue,
  searchIssues,
  transformIssue,
  updateIssueArray,
} = require('./issues');
const {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  searchUsers,
  transformUser,
  updateUserArray,
} = require('./users');
const { createComment, getComments, getIssueComments } = require('./comments');
const { createPullRequest } = require('./pullRequests');
const {
  createOrganization,
  deleteOrganization,
  getOneOrganization,
  getOrganizations,
  searchOrganizations,
  transformOrganization,
} = require('./organizations');
const { createTables, dropAllTables, printTables } = require('./tables');

module.exports = {
  createComment,
  createIssue,
  createOrganization,
  createPullRequest,
  createTables,
  createUser,
  deleteIssue,
  deleteOrganization,
  deleteUser,
  dropAllTables,
  getComments,
  getIssues,
  getOneIssue,
  getOneOrganization,
  getOneUser,
  getOrganizations,
  getUsers,
  getIssueComments,
  printTables,
  searchIssues,
  searchOrganizations,
  searchUsers,
  transformIssue,
  transformOrganization,
  transformUser,
  updateIssueArray,
  updateUserArray,
};
