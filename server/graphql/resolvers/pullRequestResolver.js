const { v4: uuidv4 } = require('uuid');
const {
  checkDuplicatePullRequest,
  createPullRequest,
  getOneIssue,
  getOnePullRequest,
  getPullRequests,
  getUserPullRequests,
} = require('../../db');

const { getSinglePullRequest } = require('../../integrations');
const { formatPullRequestUrl } = require('../../integrations/github/helpers');

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
      if (await checkDuplicatePullRequest(pullRequest.html_url)) {
        throw new Error(
          `Pull request at ${pullRequest.html_url} already exists`,
        );
      }
      await createPullRequest(pullRequest);
      return {
        __typename: 'Success',
        message: 'Pull request created',
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  importPullRequest: async args => {
    const { url, issueId } = args;
    try {
      const { organization, repo, pullNumber } = formatPullRequestUrl(url);
      const [{ organizationName }] = await getOneIssue('issues', issueId);

      if (organizationName !== organization && organizationName !== repo) {
        throw new Error('Pull request does not match issue repo');
      }

      const result = await getSinglePullRequest({
        organization,
        repo,
        pullNumber,
      });

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
      const formattedResult = await Promise.all(
        result.map(async pullRequest => {
          const { issueId } = pullRequest;
          const [{ fundedAmount }] = await getOneIssue('issues', issueId);
          // eslint-disable-next-line no-param-reassign
          pullRequest.fundedAmount = fundedAmount;
          return pullRequest;
        }),
      );
      return {
        __typename: 'PullRequestArray',
        pullRequestArray: formattedResult,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
};
