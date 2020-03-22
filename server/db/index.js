const pool = require('./connect');
const {
  createIssue,
  getIssues,
  getOneIssue,
  deleteIssue,
  transformIssue,
} = require('./issues');
const { createUser } = require('./users');
const { createComment } = require('./comments');
const { createPullRequest } = require('./pullRequests');
const { createOrganization } = require('./organizations');
const { createTables, dropAllTables, printTables } = require('./tables');

module.exports = {
  pool,
  createComment,
  createIssue,
  createOrganization,
  createPullRequest,
  createTables,
  createUser,
  deleteIssue,
  dropAllTables,
  getIssues,
  getOneIssue,
  printTables,
  transformIssue,
};
