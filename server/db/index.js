const pool = require('./connect');
const { createIssue, getIssues } = require('./issues');
const { createUser } = require('./users');
const { createComment } = require('./comments');
const { createPullRequest } = require('./pullRequests');
const { createOrganization } = require('./organizations');
const { createTables, dropAllTables, printTables } = require('./tables');

module.exports = {
  pool,
  createComment,
  createIssue,
  getIssues,
  createOrganization,
  createPullRequest,
  createUser,
  createTables,
  dropAllTables,
  printTables,
};
