const { v4: uuidv4 } = require('uuid');

const {
  checkDuplicatePullRequest,
  checkUserGithubId,
  createPullRequest: createPullRequestQuery,
  updateUserArray,
} = require('../../../db');
const { createPullRequestError } = require('./constants');
const {
  formatPullRequestUrl,
} = require('../../../integrations/github/helpers');
const { getSinglePullRequest } = require('../../../integrations');

const createPullRequest = async ({
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
}) => {
  try {
    const date = new Date();
    const data = {
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
    const { organization, repo } = formatPullRequestUrl(htmlUrl);
    const { githubId } = await getSinglePullRequest({
      organization,
      pullNumber,
      repo,
    });
    if (await checkUserGithubId({ githubId, userId })) {
      throw new Error(
        `Github account does not match the account associated with the pull request`,
      );
    }
    if (await checkDuplicatePullRequest({ repo: htmlUrl })) {
      throw new Error(`Pull request at ${htmlUrl} already exists`);
    }
    const result = await createPullRequestQuery({ data });

    // add issue to user issue list
    await updateUserArray({
      column: 'pull_requests',
      data: result.pullRequestId,
      userId: result.userId,
    });

    return {
      __typename: 'PullRequest',
      ...result,
    };
  } catch (error) {
    const { message } = error;
    return {
      __typename: 'Error',
      message: message || createPullRequestError,
    };
  }
};

module.exports = createPullRequest;
