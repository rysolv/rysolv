const pool = require('../db/connect');
const { mapQuery, mapQueryPrint } = require('../db/query');

// Import schemas
const {
  userSchema,
  issueSchema,
  commentSchema,
  organizationSchema,
  pullRequestSchema,
} = require('./schemas');

// Create empty tables from schema
const createTables = async () => {
  const schema = [
    userSchema,
    issueSchema,
    commentSchema,
    organizationSchema,
    pullRequestSchema,
  ];
  await mapQuery(pool, schema);
};

// Drop all tables
const dropAllTables = async () => {
  const queryArray = [
    'DROP TABLE IF EXISTS issues',
    'DROP TABLE IF EXISTS users',
    'DROP TABLE IF EXISTS comments',
    'DROP TABLE IF EXISTS organizations',
    'DROP TABLE IF EXISTS pullRequests',
  ];
  await mapQuery(pool, queryArray);
};

// Print all rows in all tables
const printTables = async () => {
  const queryArray = [
    'SELECT * FROM issues',
    'SELECT * FROM users',
    'SELECT * FROM organizations',
    'SELECT * FROM pullRequests',
    'SELECT * FROM comments',
  ];
  await mapQueryPrint(pool, queryArray);
};

module.exports = {
  createTables,
  dropAllTables,
  printTables,
};
