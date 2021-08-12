const { checkDuplicatePullRequest, getOneIssue } = require('../../../db');
const { CustomError, errorLogger } = require('../../../helpers');
const {
  diffRepoError,
  existingPullRequestError,
  importPullRequestError,
} = require('./constants');
const {
  formatPullRequestUrl,
} = require('../../../integrations/github/helpers');
const { getSinglePullRequest } = require('../../../integrations');

const importPullRequest = async ({ issueId, url }) => {
  try {
    const { organization, pullNumber, repo } = formatPullRequestUrl(url);
    const { repo: issueRepo } = await getOneIssue({ issueId });

    // @TODO: add org_displayname to issues schema to avoid this url parsing
    const { pathname } = new URL(issueRepo);
    const issueUrl = pathname.split('/');

    // Check PR organization against issue organization
    if (issueUrl[1] !== organization && issueUrl[2] !== repo)
      throw new CustomError(diffRepoError);

    const result = await getSinglePullRequest({
      organization,
      pullNumber,
      repo,
    });

    if (await checkDuplicatePullRequest({ repo: result.htmlUrl }))
      throw new CustomError(existingPullRequestError);

    return {
      __typename: 'ImportPullRequest',
      ...result,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || importPullRequestError,
    };
  }
};

module.exports = importPullRequest;
