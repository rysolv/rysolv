const pool = require('../connect');

// Import seed data
const {
  userSeed,
  issueSeed,
  commentSeed,
  pullRequestSeed,
  organzationSeed,
} = require('./seedData');

// Import db functions
const {
  createComment,
  createIssue,
  createOrganization,
  createPullRequest,
  createUser,
  createTables,
  dropAllTables,
  printTables,
} = require('..');

// seed function - run via 'npm run seed'
const seed = async () => {
  //  Rebuild tables
  const t1 = Date.now();
  await dropAllTables();
  await createTables();

  // populate data
  await createUser(userSeed);
  await createIssue(issueSeed);
  await createOrganization(organzationSeed);
  await createComment(commentSeed);
  await createPullRequest(pullRequestSeed);

  // Log results and end connection
  const t2 = Date.now();
  // eslint-disable-next-line no-console
  console.log(`----Seeding complete in ${t2 - t1}ms----`);
  await printTables();
  console.log('seed ended');
  pool.end();
};

module.exports = {
  seed,
};

// Lets you call functions from node
require('make-runnable');
