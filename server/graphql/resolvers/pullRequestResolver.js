const { v4: uuidv4 } = require('uuid');
const {
  createPullRequest,
  getPullRequests,
  getOnePullRequest,
  getUserPullRequests,
} = require('../../db');

const { getSinglePullRequest } = require('../../integrations');

module.exports = {
  createPullRequest: async args => {
    const { pullRequestInput } = args;
    const pullRequest = {
      created_date: new Date(),
      github_username: pullRequestInput.githubUsername,
      html_url: pullRequestInput.htmlUrl,
      issue_id: pullRequestInput.issueId,
      mergeable: pullRequestInput.mergeable,
      mergeable_state: pullRequestInput.mergeableState,
      merged: pullRequestInput.merged,
      modified_date: new Date(),
      open: pullRequestInput.open,
      pullrequest_id: uuidv4(),
      pull_number: pullRequestInput.pullNumber,
      status: pullRequestInput.status,
      title: pullRequestInput.title,
      user_id: pullRequestInput.userId,
    };
    try {
      await createPullRequest(pullRequest);
      return {
        __typename: 'Success',
        message: 'Pull request created',
      };
    } catch (err) {
      throw err;
    }
  },
  importPullRequest: async args => {
    const { url } = args;
    try {
      const result = await getSinglePullRequest(url);
      return {
        __typename: 'ImportPullRequest',
        ...result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  getPullRequests: async () => {
    try {
      const result = await getPullRequests();
      return {
        __typename: 'PullRequestArray',
        pullRequestArray: result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  onePullRequest: async args => {
    const { id } = args;
    try {
      const [result] = await getOnePullRequest(id);
      return {
        __typename: 'PullRequest',
        ...result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  getUserPullRequests: async args => {
    const { id } = args;
    try {
      const result = await getUserPullRequests(id);
      return {
        __typename: 'PullRequestArray',
        pullRequestArray: result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
};
