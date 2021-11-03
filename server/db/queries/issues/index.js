const checkDuplicateIssue = require('./checkDuplicateIssue');
const closeIssue = require('./closeIssue');
const createIssue = require('./createIssue');
const downvoteIssue = require('./downvoteIssue');
const getFilteredIssues = require('./getFilteredIssues');
const getFilterOptions = require('./getFilterOptions');
const getIssueAttemptList = require('./getIssueAttemptList');
const getIssueList = require('./getIssueList');
const getIssues = require('./getIssues');
const getIssueWatchList = require('./getIssueWatchList');
const getOneIssue = require('./getOneIssue');
const getRecommendedIssues = require('./getRecommendedIssues');
const searchIssues = require('./searchIssues');
const transformIssue = require('./transformIssue');
const upvoteIssue = require('./upvoteIssue');

module.exports = {
  checkDuplicateIssue,
  closeIssue,
  createIssue,
  downvoteIssue,
  getFilteredIssues,
  getFilterOptions,
  getIssueAttemptList,
  getIssueList,
  getIssues,
  getIssueWatchList,
  getOneIssue,
  getRecommendedIssues,
  searchIssues,
  transformIssue,
  upvoteIssue,
};
