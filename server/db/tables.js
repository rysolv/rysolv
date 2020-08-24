const { mapQueryPrint, singleQuery } = require('../db/query');

// Import schemas
const {
  alterActivityTable,
  alterCommentsTable,
  alterFundingTable,
  alterIssuesTable,
  alterOrganizationsTable,
  alterPullRequestsTable,
  alterUsersTable,
  alterWatchingTable,
  alterWithdrawalTable,
  createActivityTable,
  createCommentsTable,
  createFundingsTable,
  createIssuesTable,
  createOrganizationsTable,
  createPullRequestsTable,
  createUsersTable,
  createWatchingTable,
  createWithdrawalTable,
} = require('./schemas');

// Alter existing tables
const alterTables = async () => {
  await singleQuery(alterActivityTable);
  await singleQuery(alterCommentsTable);
  await singleQuery(alterFundingTable);
  await singleQuery(alterIssuesTable);
  await singleQuery(alterOrganizationsTable);
  await singleQuery(alterPullRequestsTable);
  await singleQuery(alterUsersTable);
  await singleQuery(alterWatchingTable);
  await singleQuery(alterWithdrawalTable);
};

// Create empty tables
const createTables = async () => {
  await singleQuery(createActivityTable);
  await singleQuery(createCommentsTable);
  await singleQuery(createFundingsTable);
  await singleQuery(createIssuesTable);
  await singleQuery(createOrganizationsTable);
  await singleQuery(createPullRequestsTable);
  await singleQuery(createUsersTable);
  await singleQuery(createWatchingTable);
  await singleQuery(createWithdrawalTable);
};

// Drop all tables
const dropAllTables = async () => {
  // TODO: figure out a way to await/map through this
  await singleQuery('DROP TABLE IF EXISTS activity cascade');
  await singleQuery('DROP TABLE IF EXISTS comments cascade');
  await singleQuery('DROP TABLE IF EXISTS funding cascade');
  await singleQuery('DROP TABLE IF EXISTS issues cascade');
  await singleQuery('DROP TABLE IF EXISTS organizations cascade');
  await singleQuery('DROP TABLE IF EXISTS pullRequests cascade');
  await singleQuery('DROP TABLE IF EXISTS users cascade');
  await singleQuery('DROP TABLE IF EXISTS watching cascade');
  await singleQuery('DROP TABLE IF EXISTS withdrawal cascade');
};

// Print all rows in all tables
const printTables = async () => {
  const queryArray = [
    'SELECT * FROM activity',
    'SELECT * FROM comments',
    'SELECT * FROM funding',
    'SELECT * FROM issues',
    'SELECT * FROM organizations',
    'SELECT * FROM pullRequests',
    'SELECT * FROM users',
    'SELECT * FROM watching',
    'SELECT * FROM withdrawal',
  ];
  await mapQueryPrint(queryArray);
};

module.exports = {
  alterTables,
  createTables,
  dropAllTables,
  printTables,
};
