const { mapQueryPrint, singleQuery } = require('../db/query');

// Import schemas
const {
  activitySchema,
  commentSchema,
  fundingSchema,
  issueSchema,
  organizationSchema,
  pullRequestSchema,
  userSchema,
  withdrawalSchema,
} = require('./schemas');

// Create empty tables from schema
const createTables = async () => {
  // TODO: figure out a way to await/map through this
  await singleQuery(organizationSchema);
  await singleQuery(userSchema);
  await singleQuery(commentSchema);
  await singleQuery(fundingSchema);
  await singleQuery(issueSchema);
  await singleQuery(pullRequestSchema);
  await singleQuery(activitySchema);
  await singleQuery(withdrawalSchema);
};

// Drop all tables
const dropAllTables = async () => {
  // TODO: figure out a way to await/map through this
  await singleQuery('DROP TABLE IF EXISTS activity cascade');
  await singleQuery('DROP TABLE IF EXISTS issues cascade');
  await singleQuery('DROP TABLE IF EXISTS users cascade');
  await singleQuery('DROP TABLE IF EXISTS comments cascade');
  await singleQuery('DROP TABLE IF EXISTS organizations cascade');
  await singleQuery('DROP TABLE IF EXISTS pullRequests cascade');
  await singleQuery('DROP TABLE IF EXISTS withdrawal cascade');
};

// Print all rows in all tables
const printTables = async () => {
  const queryArray = [
    'SELECT * FROM activity',
    'SELECT * FROM comments',
    'SELECT * FROM issues',
    'SELECT * FROM organizations',
    'SELECT * FROM pullRequests',
    'SELECT * FROM users',
    'SELECT * FROM withdrawal',
  ];
  await mapQueryPrint(queryArray);
};

module.exports = {
  createTables,
  dropAllTables,
  printTables,
};
