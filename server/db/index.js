// const pool = require('./connect');
const {
  createIssue,
  getIssues,
  getOneIssue,
  deleteIssue,
  transformIssue,
} = require('./issues');
const {
  createUser,
  getUsers,
  getOneUser,
  transformUser,
  deleteUser,
} = require('./users');
const { createComment } = require('./comments');
const { createPullRequest } = require('./pullRequests');
const {
  createOrganization,
  getOrganizations,
  transformOrganization,
  deleteOrganization,
  getOneOrganization,
} = require('./organizations');
const { createTables, dropAllTables, printTables } = require('./tables');

module.exports = {
  // pool,
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
  getOneOrganization,
  getIssues,
  getOneIssue,
  getOneUser,
  getOrganizations,
  getUsers,
  printTables,
  transformIssue,
  transformUser,
  transformOrganization,
};
