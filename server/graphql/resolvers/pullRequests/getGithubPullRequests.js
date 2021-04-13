/* eslint-disable no-param-reassign */
const { CustomError, errorLogger } = require('../../../helpers');
const { formatIssueUrl } = require('../../../integrations/github/helpers');
const {
  getOneIssue,
  getUserPullRequests,
  getUserSettings,
} = require('../../../db');
const { getUserGithubPullRequests } = require('../../../integrations');
const { githubNotVerifiedError } = require('./constants');

const getGithubPullRequests = async ({ issueId }, { authError, userId }) => {
  if (authError) throw new CustomError(authError);

  try {
    const { repo: url } = await getOneIssue({ issueId });
    const { repo } = formatIssueUrl(url);
    const { githubUsername, isGithubVerified } = await getUserSettings({
      userId,
    });

    if (isGithubVerified) {
      const existingPullRequests = await getUserPullRequests({ userId });
      const githubPullRequests = await getUserGithubPullRequests({
        owner: githubUsername,
        repo,
      });
      const existingUrls = existingPullRequests.map(({ htmlUrl }) => htmlUrl);

      const pullRequestArray = githubPullRequests.map(pullRequest => {
        if (existingUrls && existingUrls.includes(pullRequest.htmlUrl)) {
          pullRequest.exists = true;
          return pullRequest;
        }
        pullRequest.exists = false;
        return pullRequest;
      });

      return {
        __typename: 'PullRequestArray',
        pullRequestArray,
      };
    }
    throw new CustomError(githubNotVerifiedError);
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert,
    };
  }
};

module.exports = getGithubPullRequests;
