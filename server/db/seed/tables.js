/* eslint-disable prettier/prettier */
const { mapQueryPrint, singleQuery } = require('../baseQueries');

// Import schemas
const {
  alterActivityTable,
  alterAttemptingTable,
  alterCommentsTable,
  alterCronActivityTable,
  alterFundingTable,
  alterIssuesTable,
  alterLanguagesTable,
  alterNotificationsTable,
  alterOrganizationsTable,
  alterPaymentTable,
  alterPullRequestsTable,
  alterQuestionResponseTable,
  alterQuestionsTable,
  alterUserQuestionResponseTable,
  alterUserReposTable,
  alterUsersTable,
  alterWatchingTable,
  alterWithdrawalTable,
  createActivityTable,
  createAttemptingTable,
  createCommentsTable,
  createCronActivityTable,
  createFundingsTable,
  createIssuesTable,
  createLanguagesTable,
  createNotificationsTable,
  createOrganizationsTable,
  createPaymentsTable,
  createPullRequestsTable,
  createQuestionResponseTable,
  createQuestionsTable,
  createUserQuestionResponseTable,
  createUserReposTable,
  createUsersTable,
  createWatchingTable,
  createWithdrawalTable,
} = require('../schemas');

// Alter existing tables
const alterTables = async () => {
  await singleQuery({ queryText: alterActivityTable });
  await singleQuery({ queryText: alterAttemptingTable });
  await singleQuery({ queryText: alterCommentsTable });
  await singleQuery({ queryText: alterCronActivityTable });
  await singleQuery({ queryText: alterFundingTable });
  await singleQuery({ queryText: alterIssuesTable });
  await singleQuery({ queryText: alterLanguagesTable });
  await singleQuery({ queryText: alterNotificationsTable });
  await singleQuery({ queryText: alterOrganizationsTable });
  await singleQuery({ queryText: alterPaymentTable });
  await singleQuery({ queryText: alterPullRequestsTable });
  await singleQuery({ queryText: alterQuestionResponseTable });
  await singleQuery({ queryText: alterQuestionsTable });
  await singleQuery({ queryText: alterUserQuestionResponseTable });
  await singleQuery({ queryText: alterUserReposTable });
  await singleQuery({ queryText: alterUsersTable });
  await singleQuery({ queryText: alterWatchingTable });
  await singleQuery({ queryText: alterWithdrawalTable });
};

// Create empty tables
const createTables = async () => {
  await singleQuery({ queryText: createActivityTable });
  await singleQuery({ queryText: createAttemptingTable });
  await singleQuery({ queryText: createCommentsTable });
  await singleQuery({ queryText: createCronActivityTable });
  await singleQuery({ queryText: createFundingsTable });
  await singleQuery({ queryText: createIssuesTable });
  await singleQuery({ queryText: createLanguagesTable });
  await singleQuery({ queryText: createNotificationsTable });
  await singleQuery({ queryText: createOrganizationsTable });
  await singleQuery({ queryText: createPaymentsTable });
  await singleQuery({ queryText: createPullRequestsTable });
  await singleQuery({ queryText: createQuestionResponseTable });
  await singleQuery({ queryText: createQuestionsTable });
  await singleQuery({ queryText: createUserQuestionResponseTable });
  await singleQuery({ queryText: createUserReposTable });
  await singleQuery({ queryText: createUsersTable });
  await singleQuery({ queryText: createWatchingTable });
  await singleQuery({ queryText: createWithdrawalTable });
};

// Drop all tables
const dropAllTables = async () => {
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS activity cascade' });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS attempting cascade' });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS comments cascade' });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS cronActivity cascade' });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS funding cascade' });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS issues cascade' });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS languages cascade' });
  await singleQuery({
    queryText: 'DROP TABLE IF EXISTS notifications cascade',
  });
  await singleQuery({
    queryText: 'DROP TABLE IF EXISTS organizations cascade',
  });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS payments cascade' });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS pullRequests cascade' });
  await singleQuery({
    queryText: 'DROP TABLE IF EXISTS question_responses cascade',
  });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS questions cascade' });
  await singleQuery({
    queryText: 'DROP TABLE IF EXISTS user_question_responses cascade',
  });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS user_repos cascade' });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS users cascade' });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS watching cascade' });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS withdrawal cascade' });
};

// Print all rows in all tables
const printTables = async () => {
  const queryArray = [
    'SELECT * FROM activity',
    'SELECT * FROM attempting',
    'SELECT * FROM comments',
    'SELECT * FROM cronActivity',
    'SELECT * FROM funding',
    'SELECT * FROM issues',
    'SELECT * FROM languages',
    'SELECT * FROM notifications',
    'SELECT * FROM organizations',
    'SELECT * from payments',
    'SELECT * FROM pullRequests',
    'SELECT * FROM question_responses',
    'SELECT * FROM questions',
    'SELECT * FROM user_question_responses',
    'SELECT * FROM user_repos',
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
