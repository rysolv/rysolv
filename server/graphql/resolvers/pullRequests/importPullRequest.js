const { checkDuplicatePullRequest, getOneIssue } = require('../../../db');
const {
  formatPullRequestUrl,
} = require('../../../integrations/github/helpers');
const { getSinglePullRequest } = require('../../../integrations');

const importPullRequest = async args => {
  const { url, issueId } = args;
  try {
    const { organization, repo, pullNumber } = formatPullRequestUrl(url);
    const { repo: issueRepo } = await getOneIssue({ issueId });

    // @TODO: add org_displayname to issues schema to avoid this url parsing
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

    if (await checkDuplicatePullRequest({ repo: result.htmlUrl })) {
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
};

module.exports = importPullRequest;
