const { v4: uuidv4 } = require('uuid');

const {
  checkDuplicatePullRequest,
  checkUserGithubId,
  createPullRequest,
  deletePullRequest,
  getOneIssue,
  getOnePullRequest,
  getPullRequestList,
  getPullRequests,
  getUserPullRequests,
  updateIssueArray,
  updateUserArray,
} = require('../../db');
const { formatPullRequestUrl } = require('../../integrations/github/helpers');
const { getSinglePullRequest } = require('../../integrations');

module.exports = {
  createPullRequest: async args => {
    const {
      pullRequestInput: {
        githubUsername,
        htmlUrl,
        issueId,
        mergeable,
        mergeableState,
        merged,
        open,
        pullNumber,
        status,
        title,
        userId,
      },
    } = args;
    const date = new Date();
    const newPullRequest = {
      created_date: date,
      github_username: githubUsername,
      html_url: htmlUrl,
      issue_id: issueId,
      mergeable_state: mergeableState,
      mergeable,
      merged,
      modified_date: date,
      open,
      pull_number: pullNumber,
      pullrequest_id: uuidv4(),
      status,
      title,
      user_id: userId,
    };
    try {
      if (await checkUserGithubId(htmlUrl, userId)) {
        throw new Error(
          `Github account does not match the account associated with the pull request`,
        );
      }
      if (await checkDuplicatePullRequest(htmlUrl)) {
        throw new Error(`Pull request at ${htmlUrl} already exists`);
      }
      const result = await createPullRequest(newPullRequest);

      // add issue to user issue list
      await updateUserArray({
        column: 'pull_requests',
        data: result.pullRequestId,
        userId: result.userId,
      });

      await updateIssueArray({
        column: 'pull_requests',
        data: result.pullRequestId,
        issueId: result.issueId,
      });

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
  deletePullRequest: async args => {
    const { id } = args;
    try {
      const result = await deletePullRequest(id);
      await updateUserArray({
        column: 'pull_requests',
        data: id,
        userId: result.user_id,
        remove: true,
      });

      await updateIssueArray({
        column: 'pull_requests',
        data: id,
        issueId: result.issue_id,
        remove: true,
      });

      return {
        __typename: 'Success',
        message: `Pull request ${result.title} has successfully been deleted.`,
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
      const [{ repo: issueRepo }] = await getOneIssue(issueId);

      // TODO: add org_displayname to issues schema to avoid this url parsing
      const { pathname } = new URL(issueRepo);
      const issueUrl = pathname.split('/');

      // Check PR organization against issue organization
      if (issueUrl[1] !== organization && issueUrl[2] !== repo) {
        throw new Error('Pull request does not match issue repo');
      }

      const result = await getSinglePullRequest({
        organization,
        repo,
        pullNumber,
      });

      if (await checkDuplicatePullRequest(result.htmlUrl)) {
        throw new Error(
          `Pull request at ${result.htmlUrl} has already been submitted`,
        );
      }

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
  getPullRequestList: async args => {
    const { idArray } = args;
    try {
      const pullRequestList = await Promise.all(
        idArray.map(async id => {
          const [result] = await getPullRequestList(id);
          return result;
        }),
      );
      const result = pullRequestList;
      return {
        __typename: 'PullRequestList',
        pullRequestList: result,
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
          const [{ fundedAmount }] = await getOneIssue(issueId);
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
