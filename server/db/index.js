const activity = require('./queries/activity');
const attempting = require('./queries/attempting');
const bounties = require('./queries/bounties');
const comments = require('./queries/comments');
const companies = require('./queries/companies');
const issues = require('./queries/issues');
const languages = require('./queries/languages');
const messages = require('./queries/messages');
const payments = require('./queries/payments');
const pullRequests = require('./queries/pullRequests');
const questions = require('./queries/questions');
const repos = require('./queries/repos');
const stats = require('./queries/stats');
const technologies = require('./queries/technologies');
const userRepos = require('./queries/userRepos');
const users = require('./queries/users');
const watching = require('./queries/watching');
const withdrawal = require('./queries/withdrawal');

module.exports = {
  ...activity,
  ...attempting,
  ...bounties,
  ...comments,
  ...companies,
  ...issues,
  ...languages,
  ...messages,
  ...payments,
  ...pullRequests,
  ...questions,
  ...repos,
  ...stats,
  ...technologies,
  ...userRepos,
  ...users,
  ...watching,
  ...withdrawal,
};
