const checkDuplicateIssue = require('./checkDuplicateIssue');
const closeIssue = require('./closeIssue');
const createIssue = require('./createIssue');
const downvoteIssue = require('./downvoteIssue');
const getFilterOptions = require('./getFilterOptions');
const getIssueAttemptList = require('./getIssueAttemptList');
const getIssueList = require('./getIssueList');
const getIssues = require('./getIssues');
const getIssueWatchList = require('./getIssueWatchList');
const getOneIssue = require('./getOneIssue');
const searchIssues = require('./searchIssues');
const transformIssue = require('./transformIssue');
const upvoteIssue = require('./upvoteIssue');

module.exports = {
  checkDuplicateIssue,
  closeIssue,
  createIssue,
  downvoteIssue,
  getFilterOptions,
  getIssueAttemptList,
  getIssueList,
  getIssues,
  getIssueWatchList,
  getOneIssue,
  searchIssues,
  transformIssue,
  upvoteIssue,
};
