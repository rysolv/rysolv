const { mapQueryPrint, singleQuery } = require('../db/query');

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
  // const schema = [
  //   userSchema,
  //   issueSchema,
  //   commentSchema,
  //   organizationSchema,
  //   pullRequestSchema,
  // ];

  // TODO: figure out a way to map through this
  await singleQuery(organizationSchema);
  await singleQuery(userSchema);
  await singleQuery(commentSchema);
  await singleQuery(pullRequestSchema);
  await singleQuery(issueSchema);
};

// Drop all tables
const dropAllTables = async () => {
  // const queryArray = [
  //   'DROP TABLE IF EXISTS issues cascade',
  //   'DROP TABLE IF EXISTS users cascade',
  //   'DROP TABLE IF EXISTS comments cascade',
  //   'DROP TABLE IF EXISTS organizations cascade',
  //   'DROP TABLE IF EXISTS pullRequests cascade',
  // ];

  // TODO: figure out a way to map through this
  await singleQuery('DROP TABLE IF EXISTS issues cascade');
  await singleQuery('DROP TABLE IF EXISTS users cascade');
  await singleQuery('DROP TABLE IF EXISTS comments cascade');
  await singleQuery('DROP TABLE IF EXISTS organizations cascade');
  await singleQuery('DROP TABLE IF EXISTS pullRequests cascade');
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
  await mapQueryPrint(queryArray);
};

module.exports = {
  createTables,
  dropAllTables,
  printTables,
};
