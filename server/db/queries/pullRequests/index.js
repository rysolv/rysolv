const checkDuplicatePullRequest = require('./checkDuplicatePullRequest');
const createPullRequest = require('./createPullRequest');
const deletePullRequest = require('./deletePullRequest');
const getOnePullRequest = require('./getOnePullRequest');
const getPullRequestList = require('./getPullRequestList');
const getUserPullRequests = require('./getUserPullRequests');

module.exports = {
  checkDuplicatePullRequest,
  createPullRequest,
  deletePullRequest,
  getOnePullRequest,
  getPullRequestList,
  getUserPullRequests,
};
