/* eslint-disable prettier/prettier */
const { mapQueryPrint, singleQuery } = require('../baseQueries');

// Import schemas
const {
  alterActivityTable,
  alterAttemptingTable,
  alterCandidatePositionsTable,
  alterCommentsTable,
  alterCompaniesTable,
  alterCronActivityTable,
  alterFundingTable,
  alterHiringActivityTable,
  alterIssuesTable,
  alterLanguagesTable,
  alterMessagesTable,
  alterNotificationsTable,
  alterPaymentTable,
  alterPositionTechStackTable,
  alterPullRequestsTable,
  alterQuestionResponseTable,
  alterQuestionsTable,
  alterRecruitingTable,
  alterReposTable,
  alterUserCompaniesTable,
  alterUserQuestionResponseTable,
  alterUserReposTable,
  alterUsersTable,
  alterWatchingTable,
  alterWithdrawalTable,
  createActivityTable,
  createAttemptingTable,
  createCandidatePositionsTable,
  createCommentsTable,
  createCompaniesTable,
  createCronActivityTable,
  createFundingsTable,
  createHiringActivityTable,
  createIssuesTable,
  createLanguagesTable,
  createMessagesTable,
  createNotificationsTable,
  createPaymentsTable,
  createPositionTechStackTable,
  createPullRequestsTable,
  createQuestionResponseTable,
  createQuestionsTable,
  createRecruitingTable,
  createReposTable,
  createUserCompaniesTable,
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
  await singleQuery({ queryText: alterCandidatePositionsTable });
  await singleQuery({ queryText: alterCommentsTable });
  await singleQuery({ queryText: alterCompaniesTable });
  await singleQuery({ queryText: alterCronActivityTable });
  await singleQuery({ queryText: alterFundingTable });
  await singleQuery({ queryText: alterHiringActivityTable });
  await singleQuery({ queryText: alterIssuesTable });
  await singleQuery({ queryText: alterLanguagesTable });
  await singleQuery({ queryText: alterMessagesTable });
  await singleQuery({ queryText: alterNotificationsTable });
  await singleQuery({ queryText: alterPaymentTable });
  await singleQuery({ queryText: alterPositionTechStackTable });
  await singleQuery({ queryText: alterPullRequestsTable });
  await singleQuery({ queryText: alterQuestionResponseTable });
  await singleQuery({ queryText: alterQuestionsTable });
  await singleQuery({ queryText: alterRecruitingTable });
  await singleQuery({ queryText: alterReposTable });
  await singleQuery({ queryText: alterUserCompaniesTable });
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
  await singleQuery({ queryText: createCandidatePositionsTable });
  await singleQuery({ queryText: createCommentsTable });
  await singleQuery({ queryText: createCompaniesTable });
  await singleQuery({ queryText: createCronActivityTable });
  await singleQuery({ queryText: createFundingsTable });
  await singleQuery({ queryText: createHiringActivityTable });
  await singleQuery({ queryText: createIssuesTable });
  await singleQuery({ queryText: createLanguagesTable });
  await singleQuery({ queryText: createMessagesTable });
  await singleQuery({ queryText: createNotificationsTable });
  await singleQuery({ queryText: createPaymentsTable });
  await singleQuery({ queryText: createPositionTechStackTable });
  await singleQuery({ queryText: createPullRequestsTable });
  await singleQuery({ queryText: createQuestionResponseTable });
  await singleQuery({ queryText: createQuestionsTable });
  await singleQuery({ queryText: createRecruitingTable });
  await singleQuery({ queryText: createReposTable });
  await singleQuery({ queryText: createUserCompaniesTable });
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
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS payments cascade' });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS pullRequests cascade' });
  await singleQuery({
    queryText: 'DROP TABLE IF EXISTS question_responses cascade',
  });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS questions cascade' });
  await singleQuery({
    queryText: 'DROP TABLE IF EXISTS recruiting_signup cascade',
  });
  await singleQuery({ queryText: 'DROP TABLE IF EXISTS repos cascade' });
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
    'SELECT * from payments',
    'SELECT * FROM pullRequests',
    'SELECT * FROM question_responses',
    'SELECT * FROM questions',
    'SELECT * FROM recruiting_signup',
    'SELECT * FROM repos',
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
