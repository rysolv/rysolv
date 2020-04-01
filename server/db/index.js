// const pool = require('./connect');
const {
  createIssue,
  deleteIssue,
  getIssues,
  getOneIssue,
  transformIssue,
} = require('./issues');
const {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  searchUsers,
  transformUser,
} = require('./users');
const { createComment } = require('./comments');
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
  getIssues,
  getOneIssue,
  getOneOrganization,
  getOneUser,
  getOrganizations,
  getUsers,
  printTables,
  searchOrganizations,
  searchUsers,
  transformIssue,
  transformOrganization,
  transformUser,
};
