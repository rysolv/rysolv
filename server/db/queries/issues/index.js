const checkDuplicateIssue = require('./checkDuplicateIssue');
const closeIssue = require('./closeIssue');
const createIssue = require('./createIssue');
const deleteIssue = require('./deleteIssue');
const downvoteIssue = require('./downvoteIssue');
const getIssues = require('./getIssues');
const getOneIssue = require('./getOneIssue');
const searchIssues = require('./searchIssues');
const transformIssue = require('./transformIssue');
const updateIssueArray = require('./updateIssueArray');
const upvoteIssue = require('./upvoteIssue');

module.exports = {
  checkDuplicateIssue,
  closeIssue,
  createIssue,
  deleteIssue,
  downvoteIssue,
  getIssues,
  getOneIssue,
  searchIssues,
  transformIssue,
  updateIssueArray,
  upvoteIssue,
};
