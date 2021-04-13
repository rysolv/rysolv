const createPullRequest = require('./createPullRequest');
const deletePullRequest = require('./deletePullRequest');
const getGithubPullRequests = require('./getGithubPullRequests');
const getPullRequestList = require('./getPullRequestList');
const getUserPullRequests = require('./getUserPullRequests');
const importPullRequest = require('./importPullRequest');

module.exports = {
  createPullRequest,
  deletePullRequest,
  getGithubPullRequests,
  getPullRequestList,
  getUserPullRequests,
  importPullRequest,
};
