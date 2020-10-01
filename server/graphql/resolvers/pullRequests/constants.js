const createPullRequestError = `Something went wrong when submitting your pull request. Please try again later.`;

const createPullRequestSuccess = `Your pull request has been successfully submitted.`;

const deletePullRequestError = `Something went wrong when deleting your pull request.`;

const deletePullRequestSuccess = `Your pull request has been successfully deleted.`;

const diffGithubAccountError = `Your Github account does not match the account associated with the pull request.`;

const diffRepoError = `This pull request does not match the issue's repo.`;

const existingPullRequestError = `This pull request already exists.`;

const getUserPullRequestsError = `Something went wrong when getting your pull requests.`;

const importPullRequestError = `Something went wrong when importing this pull requests. Please try again later.`;

module.exports = {
  createPullRequestError,
  createPullRequestSuccess,
  deletePullRequestError,
  deletePullRequestSuccess,
  diffGithubAccountError,
  diffRepoError,
  existingPullRequestError,
  getUserPullRequestsError,
  importPullRequestError,
};
