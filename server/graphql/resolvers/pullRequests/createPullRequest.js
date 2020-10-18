const { v4: uuidv4 } = require('uuid');

const {
  checkDuplicatePullRequest,
  checkUserGithubId,
  createPullRequest: createPullRequestQuery,
  updateUserArray,
} = require('../../../db');
const {
  createPullRequestError,
  createPullRequestSuccess,
  diffGithubAccountError,
  existingPullRequestError,
} = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');
const {
  formatPullRequestUrl,
} = require('../../../integrations/github/helpers');
const { getSinglePullRequest } = require('../../../integrations');

const createPullRequest = async (
  {
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
    },
  },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

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
    if (await checkUserGithubId({ githubId, userId }))
      throw new CustomError(diffGithubAccountError);
    if (await checkDuplicatePullRequest({ repo: htmlUrl }))
      throw new CustomError(existingPullRequestError);

    const result = await createPullRequestQuery({ data });

    // Add issue to user issue list
    await updateUserArray({
      column: 'pull_requests',
      data: result.pullRequestId,
      userId: result.userId,
    });

    return {
      __typename: 'Success',
      message: createPullRequestSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || createPullRequestError,
    };
  }
};

module.exports = createPullRequest;
